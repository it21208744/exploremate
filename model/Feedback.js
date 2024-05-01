import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userEmail: {

        type: mongoose.Schema.Types.String,
        ref: 'user',
        required: true
    }
    // photo: {
    //     data: Buffer, // Store the photo data as binary data
    //     contentType: String // Store the content type of the photo
    // }
}, {
    timestamps: true
});


const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
