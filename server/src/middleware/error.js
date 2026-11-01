import mongoose from 'mongoose'
import multer from 'multer'

export const notFound = (req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let status = err.status || 500
  let message = err.message || 'Something went wrong'
  let details = err.details

  if (err instanceof mongoose.Error.CastError) {
    status = 400
    message = 'Invalid id'
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = 400
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }))
    message = details[0]?.message || 'Invalid input'
  } else if (err?.code === 11000) {
    status = 409
    message = 'That record already exists'
  } else if (err instanceof multer.MulterError) {
    status = 400
    message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be smaller than 5 MB' : err.message
  }

  if (status >= 500) console.error('💥', err)
  res.status(status).json({ message: status >= 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : message, details })
}
