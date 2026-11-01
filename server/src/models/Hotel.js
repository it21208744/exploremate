import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, index: true },
    address: { type: String, trim: true, default: '' },
    pricePerNight: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    roomDetails: { type: String, required: true, trim: true },
    packageDetails: { type: String, required: true, trim: true },
    amenities: [{ type: String, trim: true }],
    maxGuests: { type: Number, min: 1, default: 2 },
    imageUrl: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

hotelSchema.index({ name: 'text', location: 'text', description: 'text' })

export default mongoose.model('Hotel', hotelSchema)
