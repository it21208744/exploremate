import { Router } from 'express'
import Joi from 'joi'
import Feedback from '../models/Feedback.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { HttpError, asyncHandler } from '../utils/http.js'

const router = Router()

const schema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().label('Rating'),
  category: Joi.string().valid('general', 'planner', 'booking', 'bug', 'idea').default('general'),
  message: Joi.string().trim().min(3).max(2000).required().label('Message'),
  isPublic: Joi.boolean().default(true),
})

/** Public testimonials for the landing page (real user feedback only). */
router.get(
  '/public',
  asyncHandler(async (_req, res) => {
    const list = await Feedback.find({ isPublic: true, rating: { $gte: 4 }, category: { $nin: ['bug'] } })
      .populate('user', 'firstName lastName role')
      .sort({ isSample: 1, rating: -1, createdAt: -1 })
      .limit(6)
      .lean()
    res.json(
      list
        .filter((f) => f.user)
        .map((f) => ({
          id: f._id,
          rating: f.rating,
          message: f.message,
          name: `${f.user.firstName} ${f.user.lastName?.[0] || ''}.`.trim(),
          role: f.user.role,
          isSample: !!f.isSample,
          createdAt: f.createdAt,
        }))
    )
  })
)

router.use(requireAuth)

router.get('/mine', asyncHandler(async (req, res) => res.json(await Feedback.find({ user: req.user._id }).sort({ createdAt: -1 }).lean())))

router.post('/', validate(schema), asyncHandler(async (req, res) => res.status(201).json(await Feedback.create({ ...req.body, user: req.user._id }))))

const own = async (req) => {
  const fb = await Feedback.findById(req.params.id)
  if (!fb) throw new HttpError(404, 'Feedback not found')
  if (!fb.user.equals(req.user._id)) throw new HttpError(403, 'You can only change your own feedback')
  return fb
}

router.patch(
  '/:id',
  validate(schema.fork(['rating', 'message'], (s) => s.optional()).min(1)),
  asyncHandler(async (req, res) => {
    const fb = await own(req)
    Object.assign(fb, req.body)
    await fb.save()
    res.json(fb)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const fb = await own(req)
    await fb.deleteOne()
    res.json({ message: 'Feedback deleted' })
  })
)

export default router
