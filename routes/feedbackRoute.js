import express from 'express';
import Feedback from '../model/Feedback.js'; 
import User from '../model/user.js';
import expressAsyncHandler from 'express-async-handler';
import validateToken from '../middleware/tokenValidate.js';

const router = express.Router();

// Create Feedback
router.post('/feedback', validateToken, expressAsyncHandler(async (req, res) => {
    const { message } = req.body;
    const userEmail = req.user.email; 

    
    const user = await User.findOne({ email: userEmail });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const feedback = new Feedback({
        message,
        userEmail: user.email
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
}));

// Fetch All Feedback
router.get('/feedback', validateToken, expressAsyncHandler(async (req, res) => {
    try {
        const feedbackEntries = await Feedback.find({ userEmail: req.user.email });
        res.json(feedbackEntries);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));

// Update Feedback
router.put('/feedback/:id', validateToken, expressAsyncHandler(async (req, res) => {
    const { message } = req.body;

    try {
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        
        if (feedback.userEmail !== req.user.email) {
            return res.status(403).json({ message: 'You are not authorized to update this feedback' });
        }

        feedback.message = message;
        const updatedFeedback = await feedback.save();
        res.json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));

// Delete Feedback
router.delete('/feedback/:id', validateToken, expressAsyncHandler(async (req, res) => {
    try {
        const feedbackId = req.params.id;

       
        const feedback = await Feedback.findById(feedbackId);

        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        
        if (feedback.userEmail !== req.user.email) {
            return res.status(403).json({ message: 'You are not authorized to delete this feedback' });
        }

        
        await Feedback.deleteOne({ _id: feedbackId });

       
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));




export default router;





