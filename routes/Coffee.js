//const router = require("express").Router();
import { Router } from 'express'
const router = Router()






// const router = Router()
// let cof = require("../models/Cof");
import tokenValidate from '../middleware/tokenValidate.js'

import hotel from '../models/Cof.js'
router.use(tokenValidate)
router.route('/add').post(async (req, res) => {
  //const {HotelName, Email, PhoneNum,Location,Amenties,Description, RoomDetail, PackDetail} = req.body
  const HotelName = req.body.HotelName
  const Email = req.body.Email
  const PhoneNum = Number(req.body.PhoneNum)
  const Location = req.body.Location
  const Amenties = Number(req.body.Amenties)
  const Description = req.body.Description
  const RoomDetail = req.body.RoomDetail
  const PackDetail = req.body.PackDetail
  const userEmail = req.user.email

  const newSale = new hotel({
    HotelName,
    Email,
    PhoneNum,
    Location,
    Amenties,
    Description,
    RoomDetail,
    PackDetail,
    userEmail,
  })

  console.log(newSale)

  newSale
    .save()
    .then(() => {
      res.send('Sales added')
    })
    .catch((err) => {
      console.log(err)
      res.send('error occured')
    })
})

router.route('/').get((req, res) => {
  hotel
    .find({ userEmail: req.user.email })
    .then((hotel) => {
      res.json(hotel)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/update/:id').put(async (req, res) => {
  let salesId = req.params.id
  const {
    HotelName,
    Email,
    PhoneNum,
    Location,
    Amenties,
    Description,
    RoomDetail,
    PackDetail,
  } = req.body

  const UpdateHotels = {
    HotelName,
    Email,
    PhoneNum,
    Location,
    Amenties,
    Description,
    RoomDetail,
    PackDetail,
  }

  const update = await hotel
    .findByIdAndUpdate(salesId, UpdateHotels)
    .then(() => {
      res.status(200).send({ status: 'Sales updated' })
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message })
    })
})

router.route('/delete/:id').delete(async (req, res) => {
  let salesId = req.params.id
  await hotel
    .findByIdAndDelete(salesId)
    .then(() => {
      res.status(200).send({ status: 'Sale deleted' })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with delete sale', error: err.message })
    })
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






export default router
