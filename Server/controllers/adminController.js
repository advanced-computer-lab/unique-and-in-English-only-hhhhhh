const mongoose=require('mongoose');
const adminModel = require('../models/AdminModel');
let users;

module.exports = {
    authenticate: async function(){
    
    },
    createFlight: async function(req){
        await adminModel.createFlight(req);
    },
    readFlight: async function(){

    },
    updateFlight: async function(req){
        await adminModel.updateFlight(req);
    },
    deleteFlight: async function(req){
        await adminModel.deleteFlight(req);
    },
    
}