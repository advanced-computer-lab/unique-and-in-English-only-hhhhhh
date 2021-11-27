const mongoose=require('mongoose');
const schema=mongoose.Schema;
const DB = require('../db/conn');
const reservationschema=new schema({
   // _id: false,
    userId:{
        type:String,
        unique:true,
        required:true
    },
    flightId:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    departureDate:{
        type:Date,
        required:true
    },
    arrivalDate:{
        type:Date,
        required:true
    },
    departureAirportTerminal:{
        type:String,
        required:true
    },
    arrivalAirportTerminal:{
        type:String,
        required:true
    },
},{timestamps:true}); 

module.exports = mongoose.model('Reservation',reservationschema);
