const DB = require('../db/conn');
const User = require('../schemas/User');
const Flight = require('../schemas/Flight');
const Reservation = require('../schemas/Reservation');

module.exports={// this wil be edited 

    reserve: async function(req,res){
        const body = req.body;
        const newReservation = new Reservation({
            userName:body.userName,
            departureFlightId:body.departureFlightId,
            returnFlightId: body.returnFlightId,
        }); 
        await DB.reserve(newReservation,res);
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
        //console.log(newUser);
        await DB.createUser(newUser,res);
    }
}