import express from 'express'


import connectDB from './config/db.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

const app = express()
//const mongoose = require("mongoose");
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//const bodyParser = require("body-parser");
//import bodyParser from 'body-parser';
//const cors = require("cors");
//import cors from 'cors';
//const dotenv = require("dotenv");
import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;
import CoffeeRouter from './routes/Coffee.js'


// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


















import mongoose from 'mongoose'

import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
import dotenv from 'dotenv'
import userProfileRoutes from './routes/userProfileRoute.js'
import feedbackRoutes from './routes/feedbackRoute.js'
dotenv.config()

<<<<<<< IT21226182
// app.use('api/v1/hotelowner')
app.use(express.json())

=======
const PORT = 5000
>>>>>>> main

app.use(express.json())
app.use("/api/v1/Coffee", CoffeeRouter);
app.use('/api/v1/travelers', travelersRouter)
app.use('/api/v1/taxi', taxiRouter)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/userss', userProfileRoutes)
app.use('/api/v1/feedback', feedbackRoutes)

<<<<<<< IT21226182
try {

  await mongoose.connect(URL)
  console.log('Connected to the database')
  //implement the connection to the database here
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  }
  )
  
} catch (error) {
  console.log(`error is - ${error}`)
}
=======
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
>>>>>>> main
