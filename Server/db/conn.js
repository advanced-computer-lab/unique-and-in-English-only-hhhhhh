const { MongoClient } = require("mongodb");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
const User = require("../schemas/USer");
const Db = process.env.ATLAS_URI;
console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
 

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
  },
 
  readFlight:async function(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate,res){
    // search with parameters
    const requestedFlights = await Flight.find({flightNumber:new RegExp(flightNumber,'i'),departureAirportTerminal:new RegExp(departureAirportTerminal,'i'),arrivalAirportTerminal:new RegExp(arrivalAirportTerminal,'i')})
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
          if (err) if (err.keyPattern.flightNumber==1) return res.status(500).send("duplicates");
          else res.status(500).send("connection error");
          console.log(result)
          res.status(200).send("Flight created");
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
  deleteFlight: async function (flightNumber,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        await col.deleteOne({flightNumber:flightNumber},(err,result)=>{
          console.log(result);
          if (err) return res.status(500).send(false);
            res.status(200).send(true);
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
 updateFlight: async function (search, update,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        const p = await col.updateOne(search,update,(err,result)=>{
          if (err) if (err.keyPattern.flightNumber==1) return res.status(500).send("duplicates");
          else res.status(500).send("connection error");
          console.log(result);
          res.status(200).send("Flight updated");
        });
    }
    catch(err){
      console.log(err);
    }
  },
  editProfile: async function (search, update,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("users");
        const p = await col.updateOne(search,update,(err,result)=>{
          if (err) if (err.keyPattern.username==1) return res.status(500).send("duplicates");
          else res.status(500).send("connection error");
          console.log(result);
          res.status(200).send("Profile updated");
        });
    }
    catch(err){
      console.log(err);
    }
  }
};