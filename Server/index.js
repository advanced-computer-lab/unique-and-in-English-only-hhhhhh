const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;

const User = require('./schemas/User');

const myDB = require("./conn5o5o");

app.use(cors());
app.use(express.json());
// get driver 
const dbo = require("./db/conn.js");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const guestRouter = require("./routes/guestRoutes");



app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/guest',guestRouter);

 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
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
module.exports = app;