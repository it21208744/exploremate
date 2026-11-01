import { Router } from 'express'
import Joi from 'joi'
import Booking from '../models/Booking.js'
import Hotel from '../models/Hotel.js'
import Taxi from '../models/Taxi.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { DAY_MS, HttpError, asyncHandler, toDay } from '../utils/http.js'

const router = Router()
router.use(requireAuth)

const createSchema = Joi.object({
  kind: Joi.string().valid('hotel', 'taxi').required(),
  itemId: Joi.string().hex().length(24).required().label('Listing'),
  startDate: Joi.date().iso().required().label('Start date'),
  endDate: Joi.date().iso().required().label('End date'),
  guests: Joi.number().integer().min(1).max(60).default(1).label('Guests'),
  pickupLocation: Joi.string().trim().allow('').max(200),
  notes: Joi.string().trim().allow('').max(500),
})

const populateListing = [
  { path: 'hotel', select: 'name location phone email imageUrl pricePerNight address' },
  { path: 'taxi', select: 'companyName vehicleType vehicleModel plateNo location driverName driverPhone companyPhone imageUrl dailyRate seats' },
]

router.post(
  '/',
  requireRole('traveller'),
  validate(createSchema),
  asyncHandler(async (req, res) => {
    const { kind, itemId, guests, pickupLocation, notes } = req.body
    const start = toDay(req.body.startDate)
    const end = toDay(req.body.endDate)
    const today = toDay(new Date())
    if (start < today) throw new HttpError(400, 'Start date cannot be in the past')

    let item, units, unitPrice, overlap
    if (kind === 'hotel') {
      item = await Hotel.findById(itemId)
      if (!item || !item.active) throw new HttpError(404, 'This hotel is not available')
      if (end <= start) throw new HttpError(400, 'Check-out must be after check-in')
      if (guests > item.maxGuests) throw new HttpError(400, `This hotel allows up to ${item.maxGuests} guests per booking`)
      units = Math.round((end - start) / DAY_MS) // nights; check-out day is free
      unitPrice = item.pricePerNight
      overlap = { hotel: item._id, startDate: { $lt: end }, endDate: { $gt: start } }
    } else {
      item = await Taxi.findById(itemId)
      if (!item || !item.active) throw new HttpError(404, 'This vehicle is not available')
      if (end < start) throw new HttpError(400, 'End date cannot be before start date')
      if (guests > item.seats) throw new HttpError(400, `This vehicle seats up to ${item.seats} passengers`)
      units = Math.round((end - start) / DAY_MS) + 1 // hire days, inclusive
      unitPrice = item.dailyRate
      overlap = { taxi: item._id, startDate: { $lte: end }, endDate: { $gte: start } }
    }
    if (units > 60) throw new HttpError(400, 'Bookings are limited to 60 days')

    const clash = await Booking.exists({ ...overlap, status: { $in: ['pending', 'confirmed'] } })
    if (clash) throw new HttpError(409, 'Some of those dates are already booked. Please pick other dates.')

    const booking = await Booking.create({
      kind,
      [kind]: item._id,
      owner: item.owner,
      traveller: req.user._id,
      startDate: start,
      endDate: end,
      units,
      guests,
      unitPrice,
      totalPrice: units * unitPrice,
      pickupLocation,
      notes,
      // Hotels confirm instantly; taxi owners accept or decline ride requests
      status: kind === 'hotel' ? 'confirmed' : 'pending',
    })
    res.status(201).json(await booking.populate(populateListing))
  })
)

router.get(
  '/mine',
  requireRole('traveller'),
  asyncHandler(async (req, res) => {
    const list = await Booking.find({ traveller: req.user._id }).populate(populateListing).sort({ startDate: -1 }).lean()
    res.json(list)
  })
)

router.get(
  '/incoming',
  requireRole('hotel', 'taxi'),
  asyncHandler(async (req, res) => {
    const list = await Booking.find({ owner: req.user._id })
      .populate([...populateListing, { path: 'traveller', select: 'firstName lastName email phone' }])
      .sort({ startDate: -1 })
      .lean()
    res.json(list)
  })
)

const TRANSITIONS = {
  traveller: { pending: ['cancelled'], confirmed: ['cancelled'] },
  owner: { pending: ['confirmed', 'declined'], confirmed: ['cancelled'] },
}

router.patch(
  '/:id/status',
  validate(Joi.object({ status: Joi.string().valid('confirmed', 'declined', 'cancelled').required() })),
  asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
    if (!booking) throw new HttpError(404, 'Booking not found')
    const actor = booking.traveller.equals(req.user._id) ? 'traveller' : booking.owner.equals(req.user._id) ? 'owner' : null
    if (!actor) throw new HttpError(403, 'This booking does not belong to you')
    const allowed = TRANSITIONS[actor][booking.status] || []
    if (!allowed.includes(req.body.status)) throw new HttpError(400, `A ${booking.status} booking cannot be ${req.body.status}`)
    if (actor === 'traveller' && booking.endDate < toDay(new Date())) throw new HttpError(400, 'Past bookings cannot be cancelled')
    booking.status = req.body.status
    await booking.save()
    res.json(await booking.populate([...populateListing, { path: 'traveller', select: 'firstName lastName email phone' }]))
  })
)

export default router
