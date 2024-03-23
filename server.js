import express from 'express'

import connectDB from './config/db.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
const app = express()

import mongoose from 'mongoose'

import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
import dotenv from 'dotenv'
import userProfileRoutes from './routes/userProfileRoute.js'
import feedbackRoutes from './routes/feedbackRoute.js'
dotenv.config()

const PORT = 5000

app.use(express.json())
app.use('/api/v1/travelers', travelersRouter)
app.use('/api/v1/taxi', taxiRouter)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/userss', userProfileRoutes)
app.use('/api/v1/feedback', feedbackRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
