const DB = require('../db/conn');
const User = require('../schemas/User');
module.exports={// this wil be edited 
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
}