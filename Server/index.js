const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;

const User = require('./models/User');
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn.js");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
app.get('/', (req,res)=>{
  const user =new User({
    firstName:'aa',
    lastName:'about my new blog',
    homeAddress:'more about my new blog',
    countryCode:'more about my new blog',
    telephoneNumber:'more about my new blog',
    email:'more about my new blog',
    passportNumber:'more about my new blog'
  });
  try{
      user.save();
      
      console.log("success");
  }
  catch(err){
      res.send (err);
  }
});

app.get('/a',async (req,res)=>{
  
  try{
    const TAs =  await User.find();
    console.log(TAs);
  }
    catch(err){
        res.send(err)
    }
});
