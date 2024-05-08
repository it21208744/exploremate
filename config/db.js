import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGODB_URL

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectDB
