const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salesSchema = new Schema({

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


const Coffee = mongoose.model("Coffee" ,salesSchema );
module.exports = Coffee;