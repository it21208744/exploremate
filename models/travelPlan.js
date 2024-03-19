import mongoose from 'mongoose'
const travelPlanSchema = new mongoose.Schema(
  {
    userEmail: String,
    city: String,
    packingList: Object,
    plan: Object,
  },
  { timestamps: true }
)

export default mongoose.model('travelPlan', travelPlanSchema)
