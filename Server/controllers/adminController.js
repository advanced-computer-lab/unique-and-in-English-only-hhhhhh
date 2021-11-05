const mongoose=require('mongoose');
const adminModel = require('../models/AdminModel');
let users;

module.exports = {
    authenticate: async function(req){
        return adminModel.authenticate(req);
    },
    createFlight: async function(req){
        await adminModel.createFlight(req);
    },
    readFlight: async function(req){
        console.log(2);
        return adminModel.readFlight(req)
    },
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    },
    
}