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
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



import CoffeeRouter from './routes/Coffee.js'
app.use("/Coffee", CoffeeRouter);




// Body parser middleware
app.use(bodyParser.json());






import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
// app.use('api/v1/auth')

// app.use('api/v1/hotelowner')
app.use(express.json())

app.use('/api/v1/travelers', travelersRouter)

app.use('/api/v1/taxi', taxiRouter)

try {
  //implement the connection to the database here
  app.listen(5000, () => {
    console.log(`server is running on port x`)
    const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});
  })
} catch (error) {
  console.log(`error is - ${error}`)
}
