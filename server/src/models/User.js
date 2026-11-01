import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export const ROLES = ['traveller', 'hotel', 'taxi']

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: 'traveller' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.password)
}

userSchema.methods.generateToken = function generateToken() {
  return jwt.sign({ id: this._id.toString(), email: this.email, role: this.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}

userSchema.methods.toPublic = function toPublic() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    role: this.role,
    createdAt: this.createdAt,
  }
}

export default mongoose.model('User', userSchema)
