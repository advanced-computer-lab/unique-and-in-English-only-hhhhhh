const mongoose=require('mongoose');
const adminModel = require('../models/AdminModel');
let users;

module.exports = {
    login: async function(req,res){
        return adminModel.login(req,res);
    },
    createFlight: async function(req,res){
        await adminModel.createFlight(req,res);
    },
    readFlight: async function(req,res){
        await adminModel.readFlight(req,res);
    },
    readAllFlights: async function(res){
        await adminModel.readAllFlights(res);
    },
    updateFlight: async function(req,res){
        await adminModel.updateFlight(req,res);
    },
    deleteFlight: async function(req,res){
        await adminModel.deleteFlight(req,res);
    },
    
}