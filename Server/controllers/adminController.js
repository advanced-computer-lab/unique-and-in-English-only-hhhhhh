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
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    },
    
}