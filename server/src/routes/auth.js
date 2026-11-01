import { Router } from 'express'
import Joi from 'joi'
import rateLimit from 'express-rate-limit'
import User, { ROLES } from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { HttpError, asyncHandler } from '../utils/http.js'

const router = Router()
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false })

const password = Joi.string()
  .min(8)
  .max(72)
  .pattern(/[a-z]/, 'lowercase')
  .pattern(/[A-Z]/, 'uppercase')
  .pattern(/\d/, 'number')
  .messages({
    'string.min': 'Password must be at least 8 characters',
    'string.pattern.name': 'Password needs at least one {#name} character',
  })

const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50).required().label('First name'),
  lastName: Joi.string().trim().min(1).max(50).required().label('Last name'),
  email: Joi.string().trim().email().required().label('Email'),
  phone: Joi.string().trim().allow('').max(20).label('Phone'),
  password: password.required().label('Password'),
  role: Joi.string().valid(...ROLES).default('traveller').label('Account type'),
})

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
})

const profileSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50).required().label('First name'),
  lastName: Joi.string().trim().min(1).max(50).required().label('Last name'),
  email: Joi.string().trim().email().required().label('Email'),
  phone: Joi.string().trim().allow('').max(20).label('Phone'),
})

const passwordSchema = Joi.object({
  currentPassword: Joi.string().required().label('Current password'),
  newPassword: password.required().label('New password'),
})

const authResponse = (user) => ({ token: user.generateToken(), user: user.toPublic() })

router.post(
  '/register',
  limiter,
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const exists = await User.exists({ email: req.body.email.toLowerCase() })
    if (exists) throw new HttpError(409, 'An account with this email already exists')
    const user = await User.create(req.body)
    res.status(201).json({ message: 'Account created', ...authResponse(user) })
  })
)

router.post(
  '/login',
  limiter,
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+password')
    if (!user || !(await user.comparePassword(req.body.password))) throw new HttpError(401, 'Invalid email or password')
    res.json({ message: 'Logged in', ...authResponse(user) })
  })
)

router.get('/me', requireAuth, (req, res) => res.json({ user: req.user.toPublic() }))

router.patch(
  '/me',
  requireAuth,
  validate(profileSchema),
  asyncHandler(async (req, res) => {
    const email = req.body.email.toLowerCase()
    if (email !== req.user.email && (await User.exists({ email }))) throw new HttpError(409, 'That email is already in use')
    Object.assign(req.user, { ...req.body, email })
    await req.user.save()
    // Email is inside the token, so issue a fresh one
    res.json({ message: 'Profile updated', ...authResponse(req.user) })
  })
)

router.patch(
  '/me/password',
  requireAuth,
  validate(passwordSchema),
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('+password')
    if (!(await user.comparePassword(req.body.currentPassword))) throw new HttpError(400, 'Current password is incorrect')
    user.password = req.body.newPassword
    await user.save()
    res.json({ message: 'Password changed' })
  })
)

export default router
