const DB = require('../db/conn');
const Flight = require('../schemas/Flight');

module.exports={
    authenticate: async function(req,res){
        const email = req.body.email;
        const password = req.body.password;
        var message ="";
        if(email == "" || email ==null){
            message = "email missing,\n";
        }
        if(password ==""|| password == null){
            message+= "password is missing";
        }
        if(message.length>0){
            res.status(200).send(message);
            return;
        }
        DB.authenticate(email,password,res);

    },
    createFlight: async function(req,res){
  
          let flight = new Flight(req.body);
          
          await DB.createFlight(flight,res);
      },
    readFlight: async function(req,res){
        const flightNumber = (req.body.flightNumber != "") ? req.body.flightNumber : "";
        const departureAirportTerminal = (req.body.departureAirportTerminal != "") ? req.body.departureAirportTerminal : "";
        const arrivalAirportTerminal = (req.body.arrivalAirport != "") ? req.body.arrivalAirportTerminal: "";
        var arrivalDate = (req.body.arrivalDate != "") ? new Date(req.body.arrivalDate) :new Date(9999,12,31,01,01,01);
        var departureDate = (req.body.departureDate != "") ? new Date(req.body.departureDate) :new Date(1000,12,31,01,01,01);
        if(arrivalDate.getTime() === departureDate.getTime()){
            departureDate = new Date(1000,12,31,01,01,01);;
            arrivalDate = new Date(9999,12,31,01,01,01);
        }
        const ecoSeatsCount = (req.body.ecoSeatsCount != "") ? req.body.ecoSeatsCount :0;
        const businessSeatsCount = (req.body.businessSeatsCount != "") ? req.body.businessSeatsCount :0;
        const flights = DB.readFlight(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate,res);

        
    },
    readAllFlights: async function(res){
         DB.readAllFlights(res);

      
    },
    updateFlight: async function(req,res){
        
        // const flightNumber = (req.body.search.flightNumber != "") ? req.body.update.flightNumber : null;
        // const departureAirportTerminal = (req.body.update.departureAirportTerminal != "") ? req.body.update.departureAirportTerminal : null;
        // const arrivalAirportTerminal = (req.body.update.arrivalAirport != "") ? req.body.update.arrivalAirportTerminal: null;
        // const arrivalDate = (req.body.update.arrivalDate != "") ? new Date(req.body.update.arrivalDate) :null;
        // const departureDate = (req.body.update.departureDate != "") ? new Date(req.body.update.departureDate) :null;
        // const ecoSeatsCount = (req.body.update.ecoSeatsCount != "") ? req.body.update.ecoSeatsCount : null;
        // const businessSeatsCount = (req.body.update.businessSeatsCount != "") ? req.body.update.businessSeatsCount : null;
        // const search ={flightNumber,departureAirportTerminal,arrivalAirportTerminal,arrivalDate,departureDate,ecoSeatsCount,businessSeatsCount,businessSeatsCount};
        const flight = new Flight(req.body.update);

        await DB.updateFlight(req.body.search,{ $set: flight},res);
    },
    deleteFlight: async function(req,res){
         await DB.deleteFlight(req.body.flightNumber,res);
    }
};