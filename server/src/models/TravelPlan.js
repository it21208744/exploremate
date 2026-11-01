import mongoose from 'mongoose'

const travelPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, trim: true },
    location: {
      name: String,
      country: String,
      region: String,
      lat: Number,
      lon: Number,
    },
    startDate: Date,
    days: Number,
    tripType: String,
    summary: String,
    itinerary: { type: Array, default: [] },
    packingList: { type: Array, default: [] },
    tips: { type: Array, default: [] },
    weather: { type: Object, default: null },
    places: { type: Array, default: [] },
    about: { type: Object, default: null },
    travellers: { type: Number, default: 1 },
    generatedBy: String,
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('TravelPlan', travelPlanSchema)
