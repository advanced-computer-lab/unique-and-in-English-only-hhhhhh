const { MongoClient } = require("mongodb");
const Flight = require("../models/flight");
const Db = process.env.ATLAS_URI;
console.log(Db);
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 

module.exports = {
  connectToServer: async function(callback) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db("test");
         // Use the collection "people"
         const col = db.collection("people");
         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing ssssssssmachine", "Turing test", "Turingery" ],
             "views": 12000
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
},
 
  createFlight: async function (flight) {
    try{
      await client.connect();
        console.log("Connected correctly to server2");
        const db = client.db("test");
        // Use the collection "people"
        const col = db.collection("flights");
        const p = await col.insertOne(flight);
    }
    catch(err){
      console.log(err);
    }
    finally {
      await client.close();
  }
  },
};