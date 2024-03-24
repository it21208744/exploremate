import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://Chamodan:chamodan2001@cluster0.souvqop.mongodb.net/Exploremate2?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
