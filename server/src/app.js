import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import env from './config/env.js'
import { UPLOAD_DIR } from './middleware/upload.js'
import { errorHandler, notFound } from './middleware/error.js'
import { activeProvider } from './services/ai.js'
import authRoutes from './routes/auth.js'
import plannerRoutes from './routes/planner.js'
import hotelRoutes from './routes/hotels.js'
import taxiRoutes from './routes/taxis.js'
import bookingRoutes from './routes/bookings.js'
import budgetRoutes from './routes/budget.js'
import feedbackRoutes from './routes/feedback.js'
import statsRoutes from './routes/stats.js'
import uploadRoutes from './routes/uploads.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function createApp() {
  const app = express()
  app.set('trust proxy', 1)
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, contentSecurityPolicy: false }))
  app.use(cors({ origin: env.clientOrigin.split(',').map((s) => s.trim()), credentials: true }))
  app.use(express.json({ limit: '2mb' }))
  if (env.nodeEnv !== 'test') app.use(morgan('dev'))

  app.get('/api/v1/health', (_req, res) => res.json({ ok: true, ai: activeProvider(), time: new Date().toISOString() }))
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/planner', plannerRoutes)
  app.use('/api/v1/hotels', hotelRoutes)
  app.use('/api/v1/taxis', taxiRoutes)
  app.use('/api/v1/bookings', bookingRoutes)
  app.use('/api/v1/budget', budgetRoutes)
  app.use('/api/v1/feedback', feedbackRoutes)
  app.use('/api/v1/stats', statsRoutes)
  app.use('/api/v1/uploads', uploadRoutes)
  app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }))
  app.use('/api', notFound)

  // Serve the built React app (npm run build) from the same server
  const dist = path.resolve(__dirname, '../../client/dist')
  if (fs.existsSync(dist)) {
    app.use(express.static(dist))
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
  }

  app.use(errorHandler)
  return app
}
