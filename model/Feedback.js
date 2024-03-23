import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userEmail: {
        type: mongoose.Schema.Types.String,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
