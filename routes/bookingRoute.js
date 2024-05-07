import { Router } from 'express'
import tokenValidate from '../middleware/tokenValidate.js'
import mongoose from 'mongoose'
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
        hotelid: hotel._id,
        hotelEmail: hotel.Email,
        hotelPhone: hotel.PhoneNum,
        bookings: hotel.bookedDates.filter(
          (bookings) => bookings.bookedBy === userEmail
        ),
      }
    })

    res.json(relatedBookings)
    console.log(relatedBookings)
  } catch (error) {
    console.log(error)
  }
})

// router.route('/get/:id').get(async (req, res) => {
//   let salesId = req.params.id
//   const sale = await hotel
//     .findById(salesId)
//     .then((hotel) => {
//       res.status(200).send({ status: 'Sale fetched', hotel })
//     })
//     .catch((err) => {
//       console.log(err.message)
//       res
//         .status(500)
//         .send({ status: 'Error with get sale', error: err.message })
//     })
// })

router.route('/deleteBookings/:id').put(async (req, res) => {
  try {
    const hotelId = req.params.id // Extract hotel ID for clarity

    // Extract booking ID for deletion
    const bookingIdToDelete = req.body.bookingId

    if (!bookingIdToDelete) {
      return res
        .status(400)
        .json({ message: 'Missing booking ID for deletion' })
    }

    const requiredHotel = await hotel.findById(hotelId)

    const bookingDates = requiredHotel.bookedDates
    let updatedBookingDates = bookingDates.filter(
      (bookDate) => bookDate._id != bookingIdToDelete
    )

    const updatedHotel = await hotel.findByIdAndUpdate(
      hotelId,
      {
        bookedDates: updatedBookingDates,
      },
      { new: true }
    )

    res.json(updatedHotel)
  } catch (error) {
    console.error('Error updating hotel record:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

//------------------------------
router.route('/update/:id').put(async (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  console.log(req.user.email)

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
