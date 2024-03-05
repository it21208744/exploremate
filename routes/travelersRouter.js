import { Router } from 'express'
const router = Router()

import {
  addPlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
} from '../controllers/travelersController.js'

router.route('/').get(getAllPlans).post(addPlan)
router.route('/:id').get(getSinglePlan).delete(deletePlan)

export default router
