import { HttpError } from '../utils/http.js'

/** Validates req[source] against a Joi schema and replaces it with the clean value. */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const { value, error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    })
    if (error) {
      const details = error.details.map((d) => ({ field: d.path.join('.'), message: d.message.replace(/"/g, '') }))
      return next(new HttpError(400, details[0]?.message || 'Invalid input', details))
    }
    if (source === 'query') Object.defineProperty(req, 'query', { value, writable: true })
    else req[source] = value
    next()
  }
