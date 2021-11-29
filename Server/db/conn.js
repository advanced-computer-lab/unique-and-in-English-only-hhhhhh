const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
const Db = process.env.ATLAS_URI;
console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
 
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
  },
  
  createUser: async function (user,res) {
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("users");
        await col.insertOne(user,(err,result)=>{
          if (err)
          res.status(500).send("connection error");
          else
          //console.log(result)
          res.status(200).send(user.userName);
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
  updateUserInfo: async function(userName, update, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("users");
      const p = await col.updateOne({"userName": userName}, update,(err,result)=>{
        // if (err)
        //   res.status(500).send(err);
        console.log(result);
        console.log(err);
        // else
          res.status(200).send("User updated");
      });
    }
    catch(err){
      console.log(err);
    }
  },
  updateSensitiveUserInfo: async function(userName, password, update, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("users");
      const p = await col.updateOne({"userName": userName,"password": password}, update,(err,result)=>{
        console.log(result);
        if(result.modifiedCount ==0)
          res.status(200).send("incorrect username or password");
        else
          res.status(200).send("User updated");
      });
    }
    catch(err){
      console.log(err);
    }
  },
  reserve: async function(reservation, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("reservations");
      await col.insertOne(reservation,(err,result)=>{
        if (err)
        res.status(500).send("connection error");
        else
        //console.log(result)
        res.status(200).send(reservation._id);
      });
  }
  catch(err){
    console.log(err);
  }
  },
  readReservation :async function(departureFlight, returnFlight, res){
    try{
      console.log(departureFlight);
      console.log(returnFlight);
      const db = client.db("AirlineDB");
      const col = db.collection("flights");
      const requestedDepartureFlights = await Flight.find(departureFlight)
      .where('departureDate').gte(departureFlight.departureDate) 
      .where('arrivalDate').lte(departureFlight.arrivalDate)
      .where('ecoSeatsCount').gte(departureFlight.ecoSeatsCount)
      .where('businessSeatsCount').gte(departureFlight.businessSeatsCount);
      console.log(requestedDepartureFlights);

      const requestedReturnFlights = await Flight.find(returnFlight)
      .where('departureDate').gte(returnFlight.departureDate) 
      .where('arrivalDate').lte(returnFlight.arrivalDate)
      .where('ecoSeatsCount').gte(returnFlight.ecoSeatsCount)
      .where('businessSeatsCount').gte(returnFlight.businessSeatsCount);
      //console.log(requestedReturnFlights);
      
    res.status(200).send({"departureFlights":requestedDepartureFlights});
  }
  catch(err){
    console.log(err);
  }
  },
};