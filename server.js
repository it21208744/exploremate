import express from 'express'

import connectDB from './config/db.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

const app = express()

import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000

import CoffeeRouter from './routes/Coffee.js'
import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'

import userProfileRoutes from './routes/userProfileRoute.js'
import feedbackRoutes from './routes/feedbackRoute.js'

dotenv.config()

// const app = express()

app.use(express.json())
app.use('/api/v1/Coffee', CoffeeRouter)
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
