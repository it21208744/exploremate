import mongoose from 'mongoose'

export const BOOKING_STATUSES = ['pending', 'confirmed', 'declined', 'cancelled']

const bookingSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['hotel', 'taxi'], required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    taxi: { type: mongoose.Schema.Types.ObjectId, ref: 'Taxi' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    traveller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    units: { type: Number, required: true }, // nights (hotel) or days (taxi)
    guests: { type: Number, min: 1, default: 1 },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    pickupLocation: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
    status: { type: String, enum: BOOKING_STATUSES, default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
