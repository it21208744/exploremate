import jwt from 'jsonwebtoken'
import env from '../config/env.js'
import User from '../models/User.js'
import { HttpError, asyncHandler } from '../utils/http.js'

/** Requires a valid "Authorization: Bearer <token>" header. Sets req.user. */
export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) throw new HttpError(401, 'Please log in to continue')

  let payload
  try {
    payload = jwt.verify(token, env.jwtSecret)
  } catch {
    throw new HttpError(401, 'Your session has expired. Please log in again')
  }
  const user = await User.findById(payload.id)
  if (!user) throw new HttpError(401, 'Account no longer exists')
  req.user = user
  next()
})

/** Restricts a route to one or more roles. Use after requireAuth. */
export const requireRole =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new HttpError(403, 'You do not have access to this action'))
    }
    next()
  }
