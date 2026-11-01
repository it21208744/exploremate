import { Router } from 'express'
import Joi from 'joi'
import Taxi, { VEHICLE_TYPES } from '../models/Taxi.js'
import Booking from '../models/Booking.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { HttpError, asyncHandler, looseMatch } from '../utils/http.js'
import { bookedRanges } from './hotels.js'

const router = Router()
router.use(requireAuth)

const phone = Joi.string().trim().pattern(/^[+\d][\d\s-]{6,18}$/).messages({ 'string.pattern.base': 'Enter a valid phone number' })

const taxiSchema = Joi.object({
  companyName: Joi.string().trim().max(120).required().label('Company name'),
  businessRegNo: Joi.string().trim().max(40).required().label('Business reg. no'),
  companyEmail: Joi.string().trim().email().required().label('Company email'),
  companyPhone: phone.required().label('Company phone'),
  vehicleType: Joi.string().valid(...VEHICLE_TYPES).required().label('Vehicle type'),
  vehicleModel: Joi.string().trim().max(80).required().label('Vehicle model'),
  plateNo: Joi.string().trim().max(20).required().label('Number plate'),
  insuranceCompany: Joi.string().trim().max(80).required().label('Insurance company'),
  seats: Joi.number().integer().min(1).max(60).default(4).label('Seats'),
  airConditioned: Joi.boolean().default(true),
  driverName: Joi.string().trim().max(80).required().label('Driver name'),
  driverEmail: Joi.string().trim().email().required().label('Driver email'),
  driverPhone: phone.required().label('Driver phone'),
  driverLicenseNo: Joi.string().trim().max(30).required().label('Driver licence no'),
  location: Joi.string().trim().max(80).required().label('Service area'),
  dailyRate: Joi.number().min(0).max(10_000_000).required().label('Daily rate'),
  pricePerKm: Joi.number().min(0).max(100_000).default(0).label('Price per km'),
  imageUrl: Joi.string().trim().allow('').max(500),
  active: Joi.boolean().default(true),
})

const browseSchema = Joi.object({
  q: Joi.string().trim().allow('').max(100),
  location: Joi.string().trim().allow('').max(100),
  vehicleType: Joi.string().valid(...VEHICLE_TYPES, ''),
  seats: Joi.number().integer().min(1),
  maxRate: Joi.number().min(0),
  sort: Joi.string().valid('price_asc', 'price_desc', 'newest').default('newest'),
})

// Fields a traveller should not see (internal compliance details)
const PUBLIC_FIELDS = '-businessRegNo -insuranceCompany -driverLicenseNo -driverEmail'

router.get(
  '/',
  validate(browseSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { q, location, vehicleType, seats, maxRate, sort } = req.query
    const filter = { active: true }
    if (location) filter.location = looseMatch(location)
    if (vehicleType) filter.vehicleType = vehicleType
    if (seats) filter.seats = { $gte: seats }
    if (maxRate != null) filter.dailyRate = { $lte: maxRate }
    if (q) filter.$or = [{ companyName: looseMatch(q) }, { vehicleModel: looseMatch(q) }, { location: looseMatch(q) }]
    const order = { price_asc: { dailyRate: 1 }, price_desc: { dailyRate: -1 }, newest: { createdAt: -1 } }[sort]
    res.json(await Taxi.find(filter).select(PUBLIC_FIELDS).sort(order).limit(200).lean())
  })
)

router.get(
  '/mine',
  requireRole('taxi'),
  asyncHandler(async (req, res) => res.json(await Taxi.find({ owner: req.user._id }).sort({ createdAt: -1 }).lean()))
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const taxi = await Taxi.findById(req.params.id).lean()
    if (!taxi) throw new HttpError(404, 'Vehicle not found')
    const isOwner = taxi.owner.equals(req.user._id)
    if (!isOwner) for (const f of PUBLIC_FIELDS.split(' ')) delete taxi[f.slice(1)]
    res.json({ ...taxi, bookedRanges: await bookedRanges('taxi', taxi._id) })
  })
)

router.post(
  '/',
  requireRole('taxi'),
  validate(taxiSchema),
  asyncHandler(async (req, res) => res.status(201).json(await Taxi.create({ ...req.body, owner: req.user._id })))
)

const ownTaxi = async (req) => {
  const taxi = await Taxi.findById(req.params.id)
  if (!taxi) throw new HttpError(404, 'Vehicle not found')
  if (!taxi.owner.equals(req.user._id)) throw new HttpError(403, 'You can only manage your own vehicles')
  return taxi
}

router.patch(
  '/:id',
  requireRole('taxi'),
  validate(taxiSchema.fork(Object.keys(taxiSchema.describe().keys), (s) => s.optional()).min(1)),
  asyncHandler(async (req, res) => {
    const taxi = await ownTaxi(req)
    Object.assign(taxi, req.body)
    await taxi.save()
    res.json(taxi)
  })
)

router.delete(
  '/:id',
  requireRole('taxi'),
  asyncHandler(async (req, res) => {
    const taxi = await ownTaxi(req)
    await Booking.updateMany(
      { taxi: taxi._id, status: { $in: ['pending', 'confirmed'] }, endDate: { $gte: new Date() } },
      { status: 'cancelled', notes: 'Vehicle was removed by the owner' }
    )
    await taxi.deleteOne()
    res.json({ message: 'Vehicle deleted' })
  })
)

export default router
