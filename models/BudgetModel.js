
import mongoose from 'mongoose'

const  budgetSchema = new mongoose.Schema({
  Location: {
    type: String,
    required: true,
  },

  Budget: {
    type: Number,
    required: true,
  },

  NumDays: {
    type: Number,
    required: true,
  },

  
})

export default mongoose.model('budget', budgetSchema)
