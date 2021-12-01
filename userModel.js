const DB = require('../db/conn');
const Flight = require('../schemas/Flight');
const { MongoClient } = require("mongodb");

const User = require("../schemas/User");
const Db = process.env.ATLAS_URI;
console.log(Db);

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports={
authenticate: async function(req,res){
    
    const username = req.body.username;
    const password = req.body.password;
    const user={name: username};
    const pass={name: password};
        var message ="";
    if(username == "" || username ==null){
        message = "username missing,\n";
    }
    if(password ==""|| password == null){
        message+= "password number is missing";
    }
    if(message.length>0){
        res.status(200).send(message);
        return;
    }
   DB.userAthenticate(user,pass,res);

},tokenCheck: async function(req,res){
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
},deleteToken:async function(req,res){
    DB.deleteToken(req,res);
}
}