const { MongoClient } = require("mongodb");
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