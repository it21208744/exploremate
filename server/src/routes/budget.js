import { Router } from 'express'
import Joi from 'joi'
import Hotel from '../models/Hotel.js'
import Taxi from '../models/Taxi.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { asyncHandler, looseMatch } from '../utils/http.js'
import { buildBudgetOptions } from '../services/budget.js'

const router = Router()
router.use(requireAuth)

const schema = Joi.object({
  location: Joi.string().trim().min(2).max(80).required().label('Location'),
  budget: Joi.number().min(1).max(100_000_000).required().label('Budget'),
  nights: Joi.number().integer().min(1).max(30).required().label('Nights'),
  guests: Joi.number().integer().min(1).max(30).default(1).label('Guests'),
  withTaxi: Joi.boolean().default(true),
})

router.post(
  '/plan',
  validate(schema),
  asyncHandler(async (req, res) => {
    const { location, guests } = req.body
    const [hotels, taxis] = await Promise.all([
      Hotel.find({ active: true, location: looseMatch(location), maxGuests: { $gte: guests } }).lean(),
      Taxi.find({ active: true, location: looseMatch(location) }).select('-businessRegNo -insuranceCompany -driverLicenseNo -driverEmail').lean(),
    ])
    const result = await buildBudgetOptions({ ...req.body, hotels, taxis })
    const cheapest = hotels.length ? Math.min(...hotels.map((h) => h.pricePerNight)) : null
    res.json({
      query: req.body,
      ...result,
      stats: { hotelsInArea: hotels.length, taxisInArea: taxis.length, cheapestNight: cheapest },
    })
  })
)

export default router
