//const mongoose = require('mongoose');
import mongoose from 'mongoose'
// const Schema = mongoose.Schema;
const salesSchema = new mongoose.Schema({
  HotelName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  PhoneNum: {
    type: Number,
    required: true,
  },

  Location: {
    type: String,
    required: true,
  },
  Amenties: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  RoomDetail: {
    type: String,
    required: true,
  },

  PackDetail: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    required: true,
  },
})

export default mongoose.model('hotel', salesSchema)
