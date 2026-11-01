import { Router } from 'express'
import Joi from 'joi'
import rateLimit from 'express-rate-limit'
import TravelPlan from '../models/TravelPlan.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { HttpError, asyncHandler } from '../utils/http.js'
import { TRIP_TYPES, generateTrip } from '../services/planner.js'
import { geocode, getWeather } from '../services/weather.js'
import { getNearbyPlaces, getPlaceSummary } from '../services/places.js'
import { activeProvider } from '../services/ai.js'

const router = Router()
router.use(requireAuth)

const genLimiter = rateLimit({ windowMs: 60 * 1000, limit: 10, message: { message: 'Too many plans at once — please wait a minute' } })

const generateSchema = Joi.object({
  location: Joi.string().trim().min(2).max(100).required().label('Destination'),
  startDate: Joi.date().iso().required().label('Start date'),
  days: Joi.number().integer().min(1).max(14).required().label('Number of days'),
  tripType: Joi.string().valid(...TRIP_TYPES).default('Cultural').label('Trip type'),
  travellers: Joi.number().integer().min(1).max(30).default(1),
  interests: Joi.string().trim().allow('').max(300).default(''),
})

const saveSchema = Joi.object({
  title: Joi.string().trim().max(120).allow(''),
  location: Joi.object().required(),
  startDate: Joi.date().iso().allow(null),
  days: Joi.number().integer().min(1).max(30),
  tripType: Joi.string().allow(''),
  summary: Joi.string().allow(''),
  itinerary: Joi.array().required(),
  packingList: Joi.array().default([]),
  tips: Joi.array().default([]),
  weather: Joi.object().allow(null),
  places: Joi.array().default([]),
  about: Joi.object().allow(null),
  travellers: Joi.number().integer().min(1).max(30),
  generatedBy: Joi.string().allow(''),
  notes: Joi.string().allow('').max(5000),
})

router.get('/meta', (_req, res) => res.json({ tripTypes: TRIP_TYPES, aiProvider: activeProvider() }))

router.post(
  '/generate',
  genLimiter,
  validate(generateSchema),
  asyncHandler(async (req, res) => {
    const start = new Date(req.body.startDate)
    const today = new Date(new Date().toISOString().slice(0, 10))
    if (start < today) throw new HttpError(400, 'Start date cannot be in the past')
    const trip = await generateTrip({ ...req.body, startDate: start.toISOString().slice(0, 10) })
    res.json(trip)
  })
)

/** Travelpedia: weather + summary + nearby places for any destination */
router.get(
  '/explore',
  asyncHandler(async (req, res) => {
    const place = await geocode(req.query.q)
    const [weather, about, places] = await Promise.all([
      getWeather(place.lat, place.lon).catch(() => null),
      getPlaceSummary(place.name, place.country),
      getNearbyPlaces(place.lat, place.lon, { limit: 24, exclude: place.name }),
    ])
    res.json({ location: place, weather, about, places })
  })
)

router.get(
  '/plans',
  asyncHandler(async (req, res) => {
    const plans = await TravelPlan.find({ user: req.user._id })
      .select('title location startDate days tripType summary generatedBy createdAt itinerary')
      .sort({ createdAt: -1 })
      .lean()
    res.json(plans.map(({ itinerary, ...p }) => ({ ...p, activityCount: itinerary.reduce((n, d) => n + (d.activities?.length || 0), 0) })))
  })
)

router.post(
  '/plans',
  validate(saveSchema),
  asyncHandler(async (req, res) => {
    const title = req.body.title || `${req.body.days || req.body.itinerary.length}-day trip to ${req.body.location?.name || 'somewhere'}`
    const plan = await TravelPlan.create({ ...req.body, title, user: req.user._id })
    res.status(201).json(plan)
  })
)

const ownPlan = async (req) => {
  const plan = await TravelPlan.findOne({ _id: req.params.id, user: req.user._id })
  if (!plan) throw new HttpError(404, 'Plan not found')
  return plan
}

router.get('/plans/:id', asyncHandler(async (req, res) => res.json(await ownPlan(req))))

router.patch(
  '/plans/:id',
  validate(Joi.object({ title: Joi.string().trim().max(120), notes: Joi.string().allow('').max(5000) }).min(1)),
  asyncHandler(async (req, res) => {
    const plan = await ownPlan(req)
    Object.assign(plan, req.body)
    await plan.save()
    res.json(plan)
  })
)

router.delete(
  '/plans/:id',
  asyncHandler(async (req, res) => {
    const plan = await ownPlan(req)
    await plan.deleteOne()
    res.json({ message: 'Plan deleted' })
  })
)

export default router
