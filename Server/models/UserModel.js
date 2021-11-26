const DB = require('../db/conn');
const Flight = require('../schemas/Flight');
const User = require('../schemas/User');

module.exports={
    editProfile: async function(req,res){
        const user = new User(req.body.update);

    await DB.editProfile(req.body.search,{ $set: user},res);
    }
};

