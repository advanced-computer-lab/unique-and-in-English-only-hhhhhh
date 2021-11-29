const DB = require('../db/conn');

module.exports={// this wil be edited 
    readReservation: async function(req,res){
        await userModel.readReservation(req,res);
    },
    readAllReservations: async function(req,res){
        await userModel.readAllReservations(req,res);
    },
    deleteReservation: async function(req,res){
        await userModel.deleteReservation(req,res);
    },
    updateUser: async function(req,res){
        await userModel.updateUser(req,res);
    },
    login: async function(req,res){
        await userModel.login(req,res);
    },
    viewSummary: async function(req,res){
        await userModel.viewSummary(req,res);
    },
}