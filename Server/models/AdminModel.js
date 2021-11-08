const DB = require('../db/conn');
const Flight = require('../schemas/Flight');

module.exports={
    authenticate: async function(req,res){
        const email = req.body.email;
        const password = req.body.password;
        var message ="";
        console.log(email);
        console.log(password);
        console.log(email);
        if(email == "" || email ==null){
            message = "email missing,\n";
        }
        if(password ==""|| password == null){
            message+= "password is missing";
        }
        if(message.length>0){
            console.log(10);
            res.status(200).send(message);
            return;
        }
        DB.authenticate(email,password,res);

    },
    createFlight: async function(req,res){
        console.log(req.body);
  
          let flight = new Flight(req.body);
          
          await DB.createFlight(flight,res);
      },
    readFlight: async function(req,res){
        const flightNumber = (req.body.flightNumber != "") ? req.body.flightNumber : "";
        const departureAirportTerminal = (req.body.departureAirportTerminal != "") ? req.body.departureAirportTerminal : "";
        const arrivalAirportTerminal = (req.body.arrivalAirport != "") ? req.body.arrivalAirportTerminal: "";
        var arrivalDate = (req.body.arrivalDate != "") ? req.body.arrivalDate :new Date(2028,12,31,01,01,01);
        var departureDate = (req.body.departureDate != "") ? req.body.departureDate :new Date(2018,12,31,01,01,01);
        if ( departureDate == arrivalDate ){
            
              departureDate = new Date('1000-08-18T21:11:54') ;
               arrivalDate = new Date('3000-08-18T21:11:54') ;
        }


        const ecoSeatsCount = (req.body.ecoSeatsCount != "") ? req.body.ecoSeatsCount :0;
        const businessSeatsCount = (req.body.businessSeatsCount != "") ? req.body.businessSeatsCount :0;
        const flights = DB.readFlight(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate,res);

        //console.log(flights);
        // return flights;
    },
    readAllFlights: async function(res){
         DB.readAllFlights(res);

      
    },
    updateFlight: async function(req,res){
        
        await DB.updateFlight(req.body.search,{ $set: req.body.update},res);
    },
    deleteFlight: async function(req,res){
         await DB.deleteFlight(req.body.flightNumber,res);
    }
};