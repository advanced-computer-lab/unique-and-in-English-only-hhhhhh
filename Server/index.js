const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;

const User = require('./schemas/User');
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
// get driver 
const dbo = require("./db/conn.js");
const adminRouter = require("./routes/adminRoutes");



app.use('/admin',adminRouter);
 
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
