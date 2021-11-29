const DB = require('../db/conn');
const Flight = require('../schemas/Flight');
const { MongoClient } = require("mongodb");

const Admin = require("../schemas/User");
const Db = process.env.ATLAS_URI;
console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports={
    readFlight: async function(req,res){
        
    }
}