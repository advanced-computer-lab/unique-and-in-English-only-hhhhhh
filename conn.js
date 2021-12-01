const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
const User = require("../schemas/User");
require('dotenv').config();
const Db = process.env.ATLAS_URI;
console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
let refreshTokens = [];
// MongoClient.
module.exports = {
  connectToServer: async function(callback) {
    try {
         await client.connect((err,res)=>{
          if(err){
            throw err;
          }else{
            console.log("DB connected successfully");
          }
         });
        } catch (err) {
         console.log(err.stack);
     }
},
  userAuthenticate: async function(user,password,res){
    const valid = await Admin.exists({user:user,pass:pass},async(err,result)=>{
      if(err) res.status(500).send("Connection error");
      if(result==null){
        await User.exists({user:user},(err1,result1)=>{
          if(result1 == null) res.status(200).send("username doesn't exist");
          else res.status(200).send("wrong password");
        });
      }
      else{
        res.status(200).send("success");
      }
    });
    if(valid){
    const accessToken= generateAccessToken(user);
    const refreshToken= jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
     
  }
    },
  authenticate: async function(email,password,res){
    const valid = await Admin.exists({email:email,password:password},async(err,result)=>{
      if(err) res.status(500).send("Connection error");
      if(result==null){
        await Admin.exists({email:email},(err1,result1)=>{
          if(result1 == null) res.status(200).send("email doesn't exist");
          else res.status(200).send("wrong password");
        });
      }
      else{
        res.status(200).send("success");
      }
    });
  },deleteToken:async function(req,res){
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(48);
  },
 
  readFlight:async function(_id,flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate,res){
    // search with parameters
    const requestedFlights = await Flight.find({_id: mongoose.Types.ObjectId(_id),flightNumber:new RegExp(flightNumber,'i'),departureAirportTerminal:new RegExp(departureAirportTerminal,'i'),arrivalAirportTerminal:new RegExp(arrivalAirportTerminal,'i')})
    .where('departureDate').gte(departureDate) 
    .where('arrivalDate').lte(arrivalDate)
    .where('ecoSeatsCount').gte(ecoSeatsCount)
    .where('businessSeatsCount').gte(businessSeatsCount);
    res.status(200).send(requestedFlights);
  },
  readAllFlights:async function(res){
    // search with parameters
    const requestedFlights = await Flight.find();
     
    res.status(200).send(requestedFlights);
  },
  createFlight: async function (flight,res) {
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        await col.insertOne(flight,(err,result)=>{
          if (err)
          res.status(500).send("connection error");
          else
          //console.log(result)
          res.status(200).send(flight._id);
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
  deleteFlight: async function (_id,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        await col.deleteOne({_id : mongoose.Types.ObjectId(_id)},(err,result)=>{
          console.log(result);
          if (err) return res.status(500).send(false);
            res.status(200).send(true);
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
 updateFlight: async function (id, update,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        const p = await col.updateOne({"_id": mongoose.Types.ObjectId(id)}, update,(err,result)=>{
          // if (err)
          //   res.status(500).send(err);
          console.log(result);
          console.log(err);
          // else
            res.status(200).send("Flight updated");
        });
    }
    catch(err){
      console.log(err);
    }
  }
};
function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15s' });
}