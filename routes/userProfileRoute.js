import express from 'express';
import { User, validate } from '../model/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Fetch user profile by email
router.get('/:email', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
          return res.status(404).json({ message: 'User profile not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete user profile by email
router.delete('/:email', async (req, res) => {
  try {
      // Find the user by email and delete it
      const user = await User.findOneAndDelete({ email: req.params.email });
      if (!user) {
          return res.status(404).json({ message: 'User profile not found' });
      }
      res.status(200).json({ message: 'User profile deleted successfully', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Edit user profile by email
router.put('/:email', async (req, res) => {
  try {
      const { firstName, lastName, email, password } = req.body;

      // Find the user by email and update its details
      const user = await User.findOneAndUpdate({ email: req.params.email }, { $set: { firstName, lastName, email, password } }, { new: true });

      // If the user is not found, return a 404 error
      if (!user) {
          return res.status(404).json({ message: 'User profile not found' });
      }

      // If the user is found and updated successfully, return a success message and the updated user object
      res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
      // If an error occurs, log it and return a 500 error
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
