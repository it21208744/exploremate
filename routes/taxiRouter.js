import { Router } from 'express'
const router = Router()

import {
  addTaxi,
  getAllTaxies,
  getSingleTaxies,
  updateTaxi,
  deleteTaxi,
} from '../controllers/taxiController.js'

router.route('/').get(getAllTaxies).post(addTaxi)
router.route('/:id').get(getSingleTaxies).patch(updateTaxi).delete(deleteTaxi)

export default router
