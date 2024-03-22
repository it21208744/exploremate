import express from 'express'
const app = express()
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5173;
const URL = process.env.MONGODB_URL;





import plantingRouter from './routes/plantings.js'
import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
// app.use('api/v1/auth')

// app.use('api/v1/hotelowner')
app.use(express.json())

app.use('/api/v1/travelers', travelersRouter)
app.use('/api/v1/taxi', taxiRouter)
app.use("/api/v1/planting", plantingRouter);

try {
  //implement the connection to the database here
await mongoose.connect('mongodb+srv://Coffee:T39@coffeestatemanagement.vvppjvj.mongodb.net/exploremate?retryWrites=true&w=majority&appName=CoffeEstateManagement')
app.listen(5000, () => {
  console.log(`server is running on port 5000`)
})
  
} catch (error) {
  console.log(`error is - ${error}`)
}
