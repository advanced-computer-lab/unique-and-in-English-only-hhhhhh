const mongoose=require('mongoose');
const schema=mongoose.Schema;
const flightschema=new schema({
    flightNumber:{
        type:String,
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
    departureTime:{
        type:String,
        required:true
    },
    arrivalTime:{
        type:String,
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
},{timestamps:true})
const Flight=mongoose.model('Flight',flightschema);
//module.exports=Flight;
module.exports={
    createFlight: async function(){
        
    },
    readFlight: async function(){

    },
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    }
};