import express from 'express'
const app = express()

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
