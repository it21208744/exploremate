import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
 
  
}, { timestamps: true });

const UserProfile = model('UserProfile', userProfileSchema);

export default UserProfile;


