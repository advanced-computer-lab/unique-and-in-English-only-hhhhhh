const DB = require('../db/conn');
const User = require('../schemas/User');
const Flight = require('../schemas/Flight');
const Reservation = require('../schemas/Reservation');

module.exports={// this wil be edited 

    reserve: async function(req,res){
        const body = req.body;
        const newReservation = new Reservation({
            username:body.username,
            departureFlightId:body.departureFlightId,
            departureSeats: body.departureSeats,

            returnFlightId: body.returnFlightId,
            returnSeats: body.returnSeats,
            totalPrice: body.totalPrice,
            cabinClass: body.cabinClass

        }); 
        await DB.reserve(newReservation,res);
    },authenticate: async function(req,res){
    
        const username = req.body.username;
        const password = req.body.password;
        const user={name: username};
        const pass={name: password};
            var message ="";
        if(username == "" || username ==null){
            message = "username missing,\n";
        }
        if(password ==""|| password == null){
            message+= "password number is missing";
        }
        if(message.length>0){
            res.status(200).send(message);
            return;
        }
       DB.userAuthenticate(user,pass,res);
    
    },tokenCheck: async function(req,res){
       DB.checkToken(req,res);
    },deleteToken:async function(req,res){
        DB.deleteToken(req,res);
    },
    readReservation: async function(req,res){
        let departureFlight = {
            //departureAirportTerminal: new RegExp(req.body.departureAirportTerminal,'i') ,
            //arrivalAirportTerminal: new RegExp(req.body.arrivalAirportTerminal,'i') ,
            "departureAirportTerminal": (req.body.departureAirportTerminal=="")?"":req.body.departureAirportTerminal,
            "arrivalAirportTerminal": (req.body.arrivalAirportTerminal=="")?"":req.body.arrivalAirportTerminal,
            "departureDate": (req.body.departureDate=="")?"":req.body.departureDate,
            //arrivalDate: req.body.arrivalDate,
            "ecoSeatsCount" : (req.body.class =="economy")?(req.body.adults + req.body.children): 0 ,
            "businessSeatsCount" : (req.body.class =="business")?(req.body.adults + req.body.children): 0
        };

        let returnFlight  = {
            //departureAirportTerminal: new RegExp(req.body.arrivalAirportTerminal,'i'),
            //arrivalAirportTerminal: new RegExp(req.body.departureAirportTerminal,'i'),
            "departureAirportTerminal": (req.body.arrivalAirportTerminal=="")?"":req.body.arrivalAirportTerminal,
            "arrivalAirportTerminal": (req.body.departureAirportTerminal=="")?"":req.body.departureAirportTerminal,
            "departureDate":(req.body.returnDate=="")?"":req.body.returnDate,
            //arrivalDate: req.body.arrivalDate,
            "ecoSeatsCount" : (req.body.class =="economy")?(req.body.adults + req.body.children): 0 ,
            "businessSeatsCount" : (req.body.class =="business")?(req.body.adults + req.body.children): 0
        };
        
        await DB.readReservation(departureFlight, returnFlight, res);
    },
    readAllReservations: async function(req,res){
        await DB.readAllReservations(req,res);
    },
    deleteReservation: async function(req,res){
        await DB.deleteReservation(req.body._id,res);
    },
    updateUserInfo: async function(req,res){
        await DB.updateUserInfo(req.body.userName,{ $set: req.body.update},res);
    },
    updateSensitiveUserInfo: async function(req,res){
        await DB.updateSensitiveUserInfo(req.body.userName,req.body.password,{ $set: req.body.update},res);
    },
    login: async function(req,res){
        await DB.login(req,res);
    },
    viewSummary: async function(req,res){
        await DB.viewSummary(req,res);
    },
    createUser: async function(req,res){
        let newUser = new User(req.body);
        await DB.createUser(newUser,res);

    },
    readFlightSeats: async function(req,res){
        await DB.readFlightSeats(req.body._id,res);
    },
    viewMyReservations: async function(req,res){
        
        await DB.viewMyReservations(req.body.username,res);
    }
}