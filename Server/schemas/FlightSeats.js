const mongoose=require('mongoose');
const schema=mongoose.Schema;
const DB = require('../db/conn');
const seatSchema = new schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    isReserved:{
        type: Boolean,
        required: true,
    },
    
});
const flightSeatsSchema=new schema({
    // _id: false,
    flightId:{
        type:String,
        unique:true,
        required:true
    },
    availableEcoSeatsCount:{
        type:Number,
        required : true
    },
    availableBusinessSeatsCount:{
        type:Number,
        required : true
    },
    ecoSeats:[seatSchema],
    businessSeats:[seatSchema]
},{timestamps:true}); 
module.exports = mongoose.model('FlightSeats',flightSeatsSchema);