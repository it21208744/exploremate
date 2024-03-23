import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://Coffee:T39@coffeestatemanagement.vvppjvj.mongodb.net/BrownVilla_db?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
