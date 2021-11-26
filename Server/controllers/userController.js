const mongoose=require('mongoose');
const adminModel = require('../models/UserModel');
let users;

module.exports = {
    editProfile: async function(req,res){
        await UserModel.editProfile(req,res);
    }
}