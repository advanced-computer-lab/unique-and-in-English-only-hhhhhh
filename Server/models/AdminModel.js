const DB = require('../db/conn');
const Flight = require('../schemas/Flight');

module.exports={
    authenticate: async function(req){
        const username = req.body.username;
        const password = req.body.password;
        return DB.authenticate(username,password);
    },
    createFlight: async function(req){
        console.log(req.body);
  
          let flight = new Flight(req.body);
          
          await DB.createFlight(flight,(err,res)=>{
            if (err) throw err;
            res.status(200).send("flight created");
          });
      },
    readFlight: async function(req){
        console.log(3);
        const flightNumber = (req.body.flightNumber != "") ? req.body.flightNumber : "";
        const departureAirportTerminal = (req.body.departureAirportTerminal != "") ? req.body.departureAirportTerminal : "";
        const arrivalAirportTerminal = (req.body.arrivalAirport != "") ? req.body.arrivalAirportTerminal: "";
        const arrivalDate = (req.body.arrivalDate != "") ? req.body.arrivalDate :new Date(2028,12,31,01,01,01);
        const departureDate = (req.body.departureDate != "") ? req.body.departureDate :new Date(2018,12,31,01,01,01);
        const ecoSeatsCount = (req.body.ecoSeatsCount != "") ? req.body.ecoSeatsCount :0;
        const businessSeatsCount = (req.body.businessSeatsCount != "") ? req.body.businessSeatsCount :0;
        const flights = DB.readFlight(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate);

        //console.log(flights);
        return flights;
    },
    updateFlight: async function(req){
        
        await DB.updateFlight(req.body.search,{ $set: req.body.update});
    },
    deleteFlight: async function(req){
        await DB.deleteFlight(req.body.flightNumber);
    }
};