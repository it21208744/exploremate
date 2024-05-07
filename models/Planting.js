//const mongoose = require('mongoose');
import mongoose from 'mongoose'
//const Schema = mongoose.Schema;

const plantingSchema = new mongoose.Schema({
  //   date:{
  //      type:String,

  //   },
  //   divisionName:{
  //      type:String,
  //      required : true
  //   },
  //   taxiName:{
  //    type:String,
  //    required : true
  // },
  //   plantType:{
  //      type:String,
  //      required : true
  //   },
  //   numOfPlants:{
  //      type:Number,
  //      required : true
  //   },
  //   numOfWorkers:{
  //      type:Number,
  //      required : true
  //   },
  //   discription:{
  //      type:String,
  //      required : true
  //   },

  companyName: {
    type: String,
    required: true,
  },
  bussinessRegNo: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  comContactNo: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  licenNo: {
    type: String,
    required: true,
  },
  inssuranceCompany: {
    type: String,
    required: true,
  },

  driverName: {
    type: String,
    required: true,
  },
  driverEmail: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  driverLiceNo: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
  },
})

export default mongoose.model('taxi', plantingSchema)
