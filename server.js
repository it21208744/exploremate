import express from 'express'
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || 5173;
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});



const CoffeeRouter = require("./routes/Coffee.js");
app.use("/Coffee", CoffeeRouter);




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
  })
} catch (error) {
  console.log(`error is - ${error}`)
}
