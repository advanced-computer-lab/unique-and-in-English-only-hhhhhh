const { MongoClient } = require("mongodb");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
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

  authenticate: async function(username,password){
    const valid = await Admin.exists({username:username,password:password},(err,res)=>{
      if(res==null){
        console.log(false);
        return false;
      }
      else{
        console.log(true);
        return true;
      }
    });
  },
 
  createFlight: async function (flight) {
    try{
        const db = client.db("test");
        const col = db.collection("flights");
        await col.insertOne(flight,(err,res)=>{
          if(err){
            throw err;
          }else{
            console.log("flight has been added");
          }
        });
    }
    catch(err){
      console.log(err);
    }
    finally {
      await client.close();
  } 
  },
  readFlight:async function(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate){
    //const sd = Flight.find();
    // search with parameters
     const requestedFlights = await Flight.find({flightNumber:new RegExp(flightNumber,'i'),departureAirportTerminal:new RegExp(departureAirportTerminal,'i'),arrivalAirportTerminal:new RegExp(arrivalAirportTerminal,'i')})
     .where('arrivalDate').lte(arrivalDate)
     .where('departureDate').gte(departureDate)
     .where('ecoSeatsCount').gte(ecoSeatsCount)
     .where('businessSeatsCount').gte(businessSeatsCount).then(res =>{
      console.log(res);
  });;
      // requestedFlights.then((err,res)=>{
      //   console.log(res);
      // });
    return requestedFlights;
    //return await Flight.find();
  },
  createFlight: async function (flight) {
    try{
        const db = client.db("test");
        const col = db.collection("flights");
        await col.insertOne(flight,(err,res)=>{
          if(err){
            throw err;
          }else{
            console.log(res);
          }
        });
    }
    catch(err){
      console.log(err);
    }
  
  },
  deleteFlight: async function (flightNumber){
    try{
        console.log("flight has been deleted");
        const db = client.db("test");
        const col = db.collection("flights");
        await col.deleteOne({flightNumber:flightNumber},(err,res)=>{
          if (err) throw err;
          console.log(res);
        });
        
    }
    catch(err){
      console.log(err);
    }
  
  },
 updateFlight: async function (search, update){
    try{
        const db = client.db("test");
        const col = db.collection("flights");
        const p = await col.updateOne(search,update,(err,res)=>{
          if (err) throw err;
          console.log(res);
          // console.log(p);
        });
    }
    catch(err){
      console.log(err);
    }
  }
};