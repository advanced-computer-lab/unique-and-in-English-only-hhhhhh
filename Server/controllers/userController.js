const mongoose=require('mongoose');
const userModel = require('../models/UserModel');

module.exports = {
   
    readFlight: async function(req,res){
        return userModel.readFlight(req,res);
    },
   
    
}