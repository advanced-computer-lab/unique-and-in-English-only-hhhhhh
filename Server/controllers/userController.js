const mongoose=require('mongoose');
const userModel = require('../models/UserModel');

module.exports = {
    reserve: async function(req,res){
        await userModel.reserve(req,res);
    },authenticate: async function(req,res){
        return userModel.authenticate(req,res);
    
    },
    token: async function(req,res){
        return userModel.tokenCheck(req,res);
    },
    deleteToken:async function(req,res){
        return userModel.deleteToken(req,res)
    },
    readReservation: async function(req,res){
        await userModel.readReservation(req,res);
    },
    readAllReservations: async function(req,res){
        await userModel.readAllReservations(req,res);
    },
    deleteReservation: async function(req,res){
        await userModel.deleteReservation(req,res);
    },
    updateUserInfo: async function(req,res){
        await userModel.updateUserInfo(req,res);
    },
    updateSensitiveUserInfo: async function(req,res){
        await userModel.updateSensitiveUserInfo(req,res);
    },
    login: async function(req,res){
        await userModel.login(req,res);
    },
    viewSummary: async function(req,res){
        await userModel.viewSummary(req,res);
    },
    createUser: async function(req,res){
        await userModel.createUser(req,res);
    },
    readFlightSeats: async function(req,res){
        userModel.readFlightSeats(req,res);
    },
    viewMyReservations: async function(req,res){
        await userModel.viewMyReservations(req,res);
    },
    test: async function(req,res){
        userModel.test(req,res);
    },
    readFlightById: async function(req,res){
        userModel.readFlightById(req,res);
    },
    viewUserInfo: async function(req,res){
        userModel.viewUserInfo(req,res);
    },
    checkout: async function(req,res){
        userModel.checkout(req,res);
    },
    updateReservation: async function(req,res){
        userModel.updateReservation(req,res);}
    ,
    createToken: async function(req,res){
        userModel.createToken(req,res)
    },
    createCharge: async function(req,res){
        userModel.createCharge(req,res)
    },
    searchImage: async function(req,res){
        userModel.searchImage(req,res)
    },
    getUpdateDiff: async function(req,res){
        userModel.getUpdateDiff(req,res);}
    ,
    emailReservation: async function(req,res){
        userModel.emailReservation(req,res);
    }
    
}