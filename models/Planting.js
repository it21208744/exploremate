//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//const Schema = mongoose.Schema;

const plantingSchema =new mongoose.Schema({
     
     date:{
        type:String,
        required : true
     },
     divisionName:{
        type:String,
        required : true
     },
     plantType:{
        type:String,
        required : true
     },
     numOfPlants:{
        type:Number,
        required : true
     },
     numOfWorkers:{
        type:Number,
        required : true
     },
     discription:{
        type:String,
        required : true
     },

})


export default mongoose.model('PlantingSS',plantingSchema);