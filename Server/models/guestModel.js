const DB = require('../db/conn');

module.exports={
    signUp: async function(req,res){
        return DB.signUp(req.body,res);
    }
}