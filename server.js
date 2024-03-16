import express from 'express'
const app = express()
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5173;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



import plantingRouter from './routes/plantings.js'
app.use("/planting", plantingRouter);



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
    console.log(`server is running on port 5000`)
    const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});
  })
} catch (error) {
  console.log(`error is - ${error}`)
}
