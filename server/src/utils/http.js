export class HttpError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export const escapeRegex = (s = '') => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Case-insensitive "contains" matcher for free-text location search */
export const looseMatch = (s) => new RegExp(escapeRegex(String(s).trim()), 'i')

/** Midnight-UTC date from a yyyy-mm-dd string or Date */
export const toDay = (d) => {
  const date = new Date(d)
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

export const DAY_MS = 24 * 60 * 60 * 1000
