import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import validateToken from '../middleware/tokenValidate.js';


const router = Router();

router.use(validateToken)

router.get('/Profile', async (req, res) => {
  try {
    
    const id = req.user.email
    

    

    if (!id) {
      return res.status(401).json({ message: 'id not found' });
    }

   
    // const user = await User.findById(id);
    // const user = await User.findOne(id);
    const user = await User.findOne({ email: id });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.status(200).json({ data: user, message: 'Profile details retrieved successfully' });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const id = req.user.email;

    if (!id) {
      return res.status(401).json({ message: 'ID not found' });
    }

    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if the new email provided already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email !== id) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Update user profile
    const user = await User.findOneAndUpdate({ email: id }, { firstName, lastName, email }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: user, message: 'Profile details updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// router.put('/profile/picture', async (req, res) => {
//   try {
//     const id = req.user.email;

//     if (!id) {
//       return res.status(401).json({ message: 'ID not found' });
//     }

//     const { profilePicture } = req.body;

//     if (!profilePicture) {
//       return res.status(400).json({ message: 'Please provide a profile picture' });
//     }

//     const user = await User.findOneAndUpdate({ email: id }, { profilePicture }, { new: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ data: user, message: 'Profile picture added successfully' });
//   } catch (error) {
//     console.error('Error adding profile picture:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });





export default router;

