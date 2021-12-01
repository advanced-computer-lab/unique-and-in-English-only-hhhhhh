const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
const Reservation = require("../schemas/Reservation");
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
        res.status(500).send(err);
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

      //flightNumber:new RegExp(flightNumber,'i')
      const requestedDepartureFlights = await Flight.find({departureAirportTerminal: new RegExp(departureFlight.departureAirportTerminal,'i'),
      arrivalAirportTerminal: new RegExp(departureFlight.arrivalAirportTerminal,'i')})
      .where('ecoSeatsCount').gte(departureFlight.ecoSeatsCount)
      .where('businessSeatsCount').gte(departureFlight.businessSeatsCount);
     
      const requestedReturnFlights = await Flight.find({departureAirportTerminal: new RegExp(returnFlight.departureAirportTerminal,'i'),
        arrivalAirportTerminal: new RegExp(returnFlight.arrivalAirportTerminal,'i')})
        .where('ecoSeatsCount').gte(returnFlight.ecoSeatsCount)
        .where('businessSeatsCount').gte(returnFlight.businessSeatsCount);
        
    res.status(200).send({"departureFlights":requestedDepartureFlights,"returnFlights":requestedReturnFlights});
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
  },
  deleteReservation: async function (_id,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("reservations");
        console.log(_id);
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
  viewMyReservations:  async function (username ,res){
    try{
      console.log(username);
        const reservations = await Reservation.find({username: username});
        
        console.log(reservations);
        var resultArray =[];
         for(var item in reservations) {
          const departureFlight = await Flight.find({_id: mongoose.Types.ObjectId(reservations[item].departureFlightId)});
          const returnFlight = await Flight.find({_id: mongoose.Types.ObjectId(reservations[item].returnFlightId)});
          const resultElement ={
            departureFlight: departureFlight,
            departureSeats: reservations[item].departureSeats,
            returnFlight: returnFlight,
            departureSeats: reservations[item].returnSeats,
            
          }
          console.log(departureFlight);
          console.log(returnFlight);
        }
        
       


        res.send(resultArray);
        // res.status(200).send({
        //   departureFlight:departureFlight,
        //   departureSeats: reservations.departureSeats,
        //   returnFlight: returnFlight,
        //   returnSeats: reservations.returnSeats,
        //   totalPrice:reservations.totalPrice
        // });
    }
    catch(err){
      console.log(err);
    }
  },
};