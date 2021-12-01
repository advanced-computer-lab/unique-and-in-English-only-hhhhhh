const userModel = require("../models/userModel");

module.exports = {
authenticate: async function(req,res){
    return userModel.authenticate(req,res);

},
token: async function(req,res){
    return userModel.tokenCheck(req,res);
},
deleteToken:async function(req,res){
    return userModel.deleteToken(req,res)
}
}