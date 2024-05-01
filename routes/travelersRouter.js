import { Router } from 'express'
const router = Router()
import validateToken from '../middleware/tokenValidate.js'
import {
  addPlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
  savePlan,
} from '../controllers/travelersController.js'

router.use(validateToken)

router.route('/').get(getAllPlans).post(addPlan)
router.route('/:id').get(getSinglePlan).delete(deletePlan)
router.route('/savePlan').post(savePlan)
export default router
