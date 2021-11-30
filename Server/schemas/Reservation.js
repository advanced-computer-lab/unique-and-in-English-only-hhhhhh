const mongoose=require('mongoose');
const schema=mongoose.Schema;
const DB = require('../db/conn');
const reservationschema=new schema({
   // _id: false,
    username:{
        type:String,
       
        required:true
    },
    departureFlightId:{
        type:String,
        required:true
    },
    departureSeats:{
        type:Map,
        of:String,
        required:true
    },
    returnFlightId:{
        type:String,
        required:true
    },
    returnSeats:{
        type:Map,
        of:String,
        required:true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    
},{timestamps:true}); 

module.exports = mongoose.model('Reservation',reservationschema);
