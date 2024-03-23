import { Router } from 'express'
const router = Router()

import {
  addPlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
  savePlan,
} from '../controllers/travelersController.js'

router.route('/').get(getAllPlans).post(addPlan)
router.route('/:id').get(getSinglePlan).delete(deletePlan)
router.route('/savePlan').post(savePlan)
export default router
