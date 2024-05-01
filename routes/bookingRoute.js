import { Router } from 'express'
const router = Router()

import hotel from '../models/Cof.js'

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
