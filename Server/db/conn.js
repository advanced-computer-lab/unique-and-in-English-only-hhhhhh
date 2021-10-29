const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
// {
  // // Verify we got a good "db" object
  // if (db)
  // {
  //   _db = db.db("ACL_DB");
  //   console.log("Successfully connected to MongoDB."); 
  // }
  // return callback(err);
  //    }
module.exports = {
  connectToServer: function (callback) {
    client.connect().then(result =>console.log("MongoDB is now connected") )
    .catch(err => console.log(err));;
  },
 
  getDb: function () {
    return _db;
  },
};