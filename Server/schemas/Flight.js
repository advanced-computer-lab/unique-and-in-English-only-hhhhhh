const mongoose=require('mongoose');
const schema=mongoose.Schema;
const DB = require('../db/conn');
const flightschema=new schema({
    //_id: false,
    flightNumber:{
        type:String,
        //unique:true,
        required:true
    },
    ecoSeatsCount:{
        type:Number,
        required:true
    },
    businessSeatsCount:{
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
    price:{
        type: Number,
        required: true
    },
},{timestamps:true}); 

module.exports = mongoose.model('Flight',flightschema);
