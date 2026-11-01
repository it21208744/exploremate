import mongoose from 'mongoose'

export const VEHICLE_TYPES = ['Car', 'Van', 'SUV', 'Tuk-tuk', 'Mini bus', 'Bus']

const taxiSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    // Company
    companyName: { type: String, required: true, trim: true },
    businessRegNo: { type: String, required: true, trim: true },
    companyEmail: { type: String, required: true, trim: true, lowercase: true },
    companyPhone: { type: String, required: true, trim: true },
    // Vehicle
    vehicleType: { type: String, enum: VEHICLE_TYPES, required: true },
    vehicleModel: { type: String, required: true, trim: true },
    plateNo: { type: String, required: true, trim: true, uppercase: true },
    insuranceCompany: { type: String, required: true, trim: true },
    seats: { type: Number, min: 1, default: 4 },
    airConditioned: { type: Boolean, default: true },
    // Driver
    driverName: { type: String, required: true, trim: true },
    driverEmail: { type: String, required: true, trim: true, lowercase: true },
    driverPhone: { type: String, required: true, trim: true },
    driverLicenseNo: { type: String, required: true, trim: true },
    // Service
    location: { type: String, required: true, trim: true, index: true },
    dailyRate: { type: Number, required: true, min: 0 },
    pricePerKm: { type: Number, min: 0, default: 0 },
    imageUrl: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Taxi', taxiSchema)
