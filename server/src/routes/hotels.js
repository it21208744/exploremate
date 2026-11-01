import { Router } from 'express'
import Joi from 'joi'
import Hotel from '../models/Hotel.js'
import Booking from '../models/Booking.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { HttpError, asyncHandler, looseMatch } from '../utils/http.js'

const router = Router()
router.use(requireAuth)

const phone = Joi.string().trim().pattern(/^[+\d][\d\s-]{6,18}$/).messages({ 'string.pattern.base': 'Enter a valid phone number' })

const hotelSchema = Joi.object({
  name: Joi.string().trim().max(120).required().label('Hotel name'),
  email: Joi.string().trim().email().required().label('Email'),
  phone: phone.required().label('Phone'),
  location: Joi.string().trim().max(80).required().label('City / location'),
  address: Joi.string().trim().allow('').max(200),
  pricePerNight: Joi.number().min(0).max(10_000_000).required().label('Price per night'),
  description: Joi.string().trim().max(2000).required().label('Description'),
  roomDetails: Joi.string().trim().max(1000).required().label('Room details'),
  packageDetails: Joi.string().trim().max(1000).required().label('Package details'),
  amenities: Joi.array().items(Joi.string().trim().max(40)).max(30).default([]),
  maxGuests: Joi.number().integer().min(1).max(50).default(2),
  imageUrl: Joi.string().trim().allow('').max(500),
  active: Joi.boolean().default(true),
})

const browseSchema = Joi.object({
  q: Joi.string().trim().allow('').max(100),
  location: Joi.string().trim().allow('').max(100),
  maxPrice: Joi.number().min(0),
  guests: Joi.number().integer().min(1),
  sort: Joi.string().valid('price_asc', 'price_desc', 'newest').default('newest'),
})

/** Future pending/confirmed date ranges for availability calendars. */
export async function bookedRanges(field, id) {
  const today = new Date(new Date().toISOString().slice(0, 10))
  const list = await Booking.find({ [field]: id, status: { $in: ['pending', 'confirmed'] }, endDate: { $gte: today } })
    .select('startDate endDate status')
    .lean()
  return list.map((b) => ({ from: b.startDate, to: b.endDate, status: b.status }))
}

router.get(
  '/',
  validate(browseSchema, 'query'),
  asyncHandler(async (req, res) => {
    const { q, location, maxPrice, guests, sort } = req.query
    const filter = { active: true }
    if (location) filter.location = looseMatch(location)
    if (maxPrice != null) filter.pricePerNight = { $lte: maxPrice }
    if (guests) filter.maxGuests = { $gte: guests }
    if (q) filter.$or = [{ name: looseMatch(q) }, { location: looseMatch(q) }, { description: looseMatch(q) }]
    const order = { price_asc: { pricePerNight: 1 }, price_desc: { pricePerNight: -1 }, newest: { createdAt: -1 } }[sort]
    res.json(await Hotel.find(filter).sort(order).limit(200).lean())
  })
)

router.get(
  '/mine',
  requireRole('hotel'),
  asyncHandler(async (req, res) => res.json(await Hotel.find({ owner: req.user._id }).sort({ createdAt: -1 }).lean()))
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).lean()
    if (!hotel) throw new HttpError(404, 'Hotel not found')
    res.json({ ...hotel, bookedRanges: await bookedRanges('hotel', hotel._id) })
  })
)

router.post(
  '/',
  requireRole('hotel'),
  validate(hotelSchema),
  asyncHandler(async (req, res) => res.status(201).json(await Hotel.create({ ...req.body, owner: req.user._id })))
)

const ownHotel = async (req) => {
  const hotel = await Hotel.findById(req.params.id)
  if (!hotel) throw new HttpError(404, 'Hotel not found')
  if (!hotel.owner.equals(req.user._id)) throw new HttpError(403, 'You can only manage your own hotels')
  return hotel
}

router.patch(
  '/:id',
  requireRole('hotel'),
  validate(hotelSchema.fork(Object.keys(hotelSchema.describe().keys), (s) => s.optional()).min(1)),
  asyncHandler(async (req, res) => {
    const hotel = await ownHotel(req)
    Object.assign(hotel, req.body)
    await hotel.save()
    res.json(hotel)
  })
)

router.delete(
  '/:id',
  requireRole('hotel'),
  asyncHandler(async (req, res) => {
    const hotel = await ownHotel(req)
    await Booking.updateMany(
      { hotel: hotel._id, status: { $in: ['pending', 'confirmed'] }, endDate: { $gte: new Date() } },
      { status: 'cancelled', notes: 'Hotel listing was removed by the owner' }
    )
    await hotel.deleteOne()
    res.json({ message: 'Hotel deleted' })
  })
)

export default router
