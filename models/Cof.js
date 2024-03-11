//const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const Schema = mongoose.Schema;
const salesSchema = new mongoose.Schema({

    itemNumber: {
       type : Number,
       required: true
    },

    itemName:{
        type : String,
        required: true

    },

    price:{
        type : Number,
        required: true

    },
    
    quantity:{
        type : Number,
        required: true

    },
    discount:{
        type : Number,
        required: true

    },
    cusType:{
        type : String,
        required: true

    }

    



})



export default mongoose.model('Cofe',salesSchema);