const DB = require('../db/conn');

module.exports={
    authenticate: async function(req){
        const username = req.query.username;
        const password = req.query.password;
        return DB.authenticate(username,password);
    },
    createFlight: async function(req){
        let  flight = {
            "flightNumber":req.body.flightNumber,
            "ecoSeatsCount": req.body.ecoSeatsCount,
            "businessSeatsCount": req.params.businessSeatsCount,
            "departureTime": req.body.departureTime,
            "arrivalTime": req.body.arrivalTime,
            "departureDate": req.body.departureDate,
            "arrivalDate": req.body.arrivalDate,
            "departureAirportTerminal": req.body.departureAirportTerminal,
            "arrivalAirportTerminal": req.body.arrivalAirportTerminal
          };
        await DB.createFlight(flight);

    },
    readFlight: async function(req){
        console.log(3);
        const flightNumber = (req.query.flightNumber != "") ? req.query.flightNumber : "";
        const departureAirportTerminal = (req.query.departureAirportTerminal != "") ? req.query.departureAirportTerminal : "";
        const arrivalAirportTerminal = (req.query.arrivalAirport != "") ? req.query.arrivalAirportTerminal: "";
        const arrivalDate = (req.query.arrivalDate != "") ? req.query.arrivalDate :new Date(2028,12,31,01,01,01);
        const departureDate = (req.query.departureDate != "") ? req.query.departureDate :new Date(2018,12,31,01,01,01);
        const ecoSeatsCount = (req.query.ecoSeatsCount != "") ? req.query.ecoSeatsCount :0;
        const businessSeatsCount = (req.query.businessSeatsCount != "") ? req.query.businessSeatsCount :0;
        const flights = DB.readFlight(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate);

        //console.log(flights);
        return flights;
    },
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    }
};