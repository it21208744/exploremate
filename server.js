import express from 'express'

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
const PORT = process.env.PORT || 5173;
const URL = process.env.MONGODB_URL;
import CoffeeRouter from './routes/Coffee.js'


// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


















import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
// app.use('api/v1/auth')

// app.use('api/v1/hotelowner')
app.use(express.json())
app.use("/Coffee", CoffeeRouter);

app.use('/api/v1/travelers', travelersRouter)

app.use('/api/v1/taxi', taxiRouter)

try {

  await mongoose.connect(URL)
  console.log('Connected to the database')
  //implement the connection to the database here
  app.listen(PORT, () => {
    console.log(`server is running on port x`)
  }
  )
  
} catch (error) {
  console.log(`error is - ${error}`)
}
