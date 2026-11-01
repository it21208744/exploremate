import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    category: { type: String, enum: ['general', 'planner', 'booking', 'bug', 'idea'], default: 'general' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Feedback', feedbackSchema)
