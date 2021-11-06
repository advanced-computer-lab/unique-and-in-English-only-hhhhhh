const mongoose = require('mongoose');
const MongoURI = process.env.ATLAS_URI ;
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

