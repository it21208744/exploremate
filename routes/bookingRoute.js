import { Router } from 'express'
import tokenValidate from '../middleware/tokenValidate.js'
const router = Router()

import hotel from '../models/Cof.js'

router.use(tokenValidate)

router.route('/').get((req, res) => {
  hotel
    .find()
    .then((hotel) => {
      res.json(hotel)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/getBookings').get(async (req, res) => {
  const userEmail = req.user?.email

  try {
    const hotels = await hotel.find({
      'bookedDates.bookedBy': userEmail,
    })

    const relatedBookings = hotels.map((hotel) => {
      return {
        hotelName: hotel.HotelName,
        hotelEmail: hotel.Email,
        hotelPhone: hotel.PhoneNum,
        bookings: hotel.bookedDates.filter(
          (bookings) => bookings.bookedBy === userEmail
        ),
      }
    })

    res.json(relatedBookings)
  } catch (error) {
    console.log(error)
  }
})

router.route('/get/:id').get(async (req, res) => {
  let salesId = req.params.id
  const sale = await hotel
    .findById(salesId)
    .then((hotel) => {
      res.status(200).send({ status: 'Sale fetched', hotel })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with get sale', error: err.message })
    })
})

router.route('/update/:id').put(async (req, res) => {
  try {
    const updatedHotelRecord = await hotel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          bookedDates: {
            bookedBy: req.user.email,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          },
        },
      },
      { new: true }
    )

    if (updatedHotelRecord) {
      console.log(
        `Booking successfully added to hotel ${updatedHotelRecord.HotelName}`
      )
      return updatedHotelRecord // Return the updated hotel object
    } else {
      console.error(`Hotel with ID ${req.params.id} not found`)
      return null // Indicate failure
    }
  } catch (error) {
    console.error('Error updating bookedDates:', error)
    throw error // Re-throw the error for handling
  }
})

export default router
