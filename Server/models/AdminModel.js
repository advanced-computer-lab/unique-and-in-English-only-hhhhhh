const DB = require('../db/conn');

module.exports={
    createFlight: async function(req){
        let  flight = {
            "flightNumber":req.body.flightNumber,
            "ecoSeatsCount": req.body.ecoSeatsCount,
            "businessSeatsCount": req.bodybusinessSeatsCount,
            "departureTime": req.body.departureTime,
            "arrivalTime": req.body.arrivalTime,
            "departureDate": req.body.departureDate,
            "arrivalDate": req.body.arrivalDate,
            "departureAirportTerminal": req.body.departureAirportTerminal,
            "arrivalAirportTerminal": req.body.arrivalAirportTerminal
          };
        await DB.createFlight(flight);

    },
    readFlight: async function(){

    },
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    }
};