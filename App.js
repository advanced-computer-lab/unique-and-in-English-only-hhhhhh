// External variables
const express = require("express");
const mongoose = require('mongoose');
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
const userController = require('./Routes/userController')


//App variables
const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/User');
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

// #Routing to usercontroller here
app.use("/user",userController);

app.get("/ta-users",async(req,res)=>{
  try{
  const TAs =  await User.find({Job:"TA"});
  res.json(TAs);
  console.log("TAs List");
}
  catch(err){
      res.send(err)
  }
});

app.get("/",async(req,res)=>{
  const user = new User({Name:"MahmoudAhmed_18954",Email:"fodiof",Age:"20",BornIn:"Egypt",LivesIn:"Egypt",MartialStatus:"dsaio",PhoneNumber:"159911",Job:"TA"})
  try{
    res.send("sdjak");
      const a1 = await user.save();
      
      console.log("success");
  }
  catch(err){
      res.send (err);
  }
});


/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
