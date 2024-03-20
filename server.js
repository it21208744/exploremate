import express from 'express'
const app = express()

import mongoose from 'mongoose'

import taxiRouter from './routes/taxiRouter.js'
import travelersRouter from './routes/travelersRouter.js'
// app.use('api/v1/auth')

// app.use('api/v1/hotelowner')
app.use(express.json())

app.use('/api/v1/travelers', travelersRouter)

app.use('/api/v1/taxi', taxiRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(404).json({ msg: 'City not found' })
})

try {
  //implement the connection to the database here
  await mongoose.connect(
    'mongodb+srv://Chamodan:chamodan2001@cluster0.souvqop.mongodb.net/exploremate?retryWrites=true&w=majority&appName=Cluster0'
  )
  app.listen(5000, () => {
    console.log(`server is running on port 5000`)
  })
} catch (error) {
  console.log(`error is - ${error}`)
}
