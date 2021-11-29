const DB = require('../db/conn');
const User = require('../schemas/User');
const Reservation = require('../schemas/Reservation');

module.exports={// this wil be edited 

    reserve: async function(req,res){
        const newReservation = new Reservation(req.body); 
        await DB.reserve(newReservation,res);
    },
    readReservation: async function(req,res){
        await DB.readReservation(req,res);
    },
    readAllReservations: async function(req,res){
        await DB.readAllReservations(req,res);
    },
    deleteReservation: async function(req,res){
        await DB.deleteReservation(req,res);
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
    },
}