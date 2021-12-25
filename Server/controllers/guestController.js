const mongoose=require('mongoose');
const guestModel = require('../models/guestModel');

module.exports = {
    signUp: async function (req, res) {
        return guestModel.signUp(req,res);
    }

}