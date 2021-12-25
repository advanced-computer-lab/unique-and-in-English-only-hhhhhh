const DB = require('../db/conn');
const User = require('../schemas/User');
const Flight = require('../schemas/Flight');
const Reservation = require('../schemas/Reservation');

module.exports={// this wil be edited 

    reserve: async function(req,res){
        const body = req.body.reservation;
        const newReservation = new Reservation({
            username:body.username,
            departureFlightId:body.departureFlightId,
            departureSeats: body.departureSeats,

            returnFlightId: body.returnFlightId,
            returnSeats: body.returnSeats,
            totalPrice: body.totalPrice,
            cabinClass: body.cabinClass

        }); 
        //console.log(req.body.charge);
        await DB.reserve(newReservation,res,req.body.charge);
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
        //console.log(req.body);
        // console.log(req.body.departureDate);
        // console.log(req.body.departureDate);
        let departureFlight = {
            //departureAirportTerminal: new RegExp(req.body.departureAirportTerminal,'i') ,
            //arrivalAirportTerminal: new RegExp(req.body.arrivalAirportTerminal,'i') ,
            "departureAirportTerminal": (req.body.departureAirportTerminal=="")?"":req.body.departureAirportTerminal,
            "arrivalAirportTerminal": (req.body.arrivalAirportTerminal=="")?"":req.body.arrivalAirportTerminal,
            "departureDate": (req.body.departureDate=="")?new Date():new Date(req.body.departureDate),
            //"arrivalDate": new Date(req.body.arrivalDate),
            "ecoSeatsCount" : (req.body.class =="economy")?(req.body.adults + req.body.children): 0 ,
            "businessSeatsCount" : (req.body.class =="business")?(req.body.adults + req.body.children): 0
        };
        //console.log(req.body.returnDate);
        let returnFlight  = {
            //departureAirportTerminal: new RegExp(req.body.arrivalAirportTerminal,'i'),
            //arrivalAirportTerminal: new RegExp(req.body.departureAirportTerminal,'i'),
            "departureAirportTerminal": (req.body.arrivalAirportTerminal=="")?"":req.body.arrivalAirportTerminal,
            "arrivalAirportTerminal": (req.body.departureAirportTerminal=="")?"":req.body.departureAirportTerminal,
            "departureDate":(req.body.returnDate=="")?new Date():new Date(req.body.returnDate),
            //"arrivalDate": new Date(req.body.arrivalDate),
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
        await DB.login(req.body,res);
    },
    viewSummary: async function(req,res){
        await DB.viewSummary(req,res);
    },
    createUser: async function(req,res){
        let newUser = new User(req.body);
        await DB.createUser(newUser,res);

    },
    readFlightSeats: async function(req,res){
        await DB.readFlightSeats(req.body._id, req.body.reservedSeats ,res);
    },
    viewMyReservations: async function(req,res){
        
        await DB.viewMyReservations(req.body.username,res);
    },
    test: async function(req,res){
        DB.reserveFlightSeats("61a7dd7918416aff86516d8c",[1,5,25,35]);
    },
    readFlightById: async function(req,res){
        DB.readFlightById(req.body._id,res);
    },
    viewUserInfo: async function(req,res){
        DB.viewUserInfo(req.body.userName,res);
    },
    checkout: async function(req,res){
        DB.checkout(req.body,res);
    },
    updateReservation: async function(req,res){
        await DB.updateReservation(req.body._id,req.body.update,res);
    },
    createToken:async function(req,res){
        DB.createToken(req,res);
    }
    ,
    createCharge:async function(req,res){
        DB.createCharge(req,res);
    },
    searchImage:async function(req,res){
        DB.searchImage(req.body.query,res);
    },
    getUpdateDiff: async function(req,res){
        await DB.getUpdateDiff(req.body._id,req.body.update,res);
    },
}