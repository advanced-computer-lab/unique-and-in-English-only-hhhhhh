const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
var nodemailer = require('nodemailer');
const Reservation = require("../schemas/Reservation");
const User = require ("../schemas/User");
const FlightSeats = require("../schemas/FlightSeats");
const Seat = require("../schemas/Seat");
//const config = require("config");

const Db = process.env.ATLAS_URI;
const mail=process.env.GMAIL_USERNAME;
const mailpass=process.env.GMAIL_PASSWORD;
console.log(Db);
const bcrypt = require("bcrypt");
const Stripe = require("../stripe/stripe");

const jwt = require('jsonwebtoken');
let refreshTokens = [];
//add the stripe folder

require('dotenv').config();
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 //nodemailer
async function cancellationMail(email,refundValue){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail,
      pass: mailpass
    }
  })
  var mailOptions = {
    from: mail,
    to: email,
    subject: 'Flight Cancellation',
    text: `The Reservation Has Been Cancelled Successfully , AmountRefunded:${refundValue}`,
    attachments: [{
      filename: 'cancelled-meeting.jpg',
      path: "./db/cancelled-meeting.jpg",
      cid: 'unique@cid'
  }]
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })}
  async function unreserveSeats(flightId,seats){
    var flightSeats = await FlightSeats.find({flightId:flightId});
    var ecoSeats = flightSeats[0]['ecoSeats'];
    var businessSeats = flightSeats[0]['businessSeats'];
    var ecoSeatsStart = ecoSeats[0]['id'];
    var availableEcoSeatsCount = flightSeats[0]['availableEcoSeatsCount'];
    var availableBusinessSeatsCount = flightSeats[0]['availableBusinessSeatsCount'];

    console.log("b4 the loop");
    console.log(seats);

    for(var seat in seats){
      console.log("still inside the loop");
      
      var seatNumber = parseInt(seats[seat]);
      console.log(seatNumber);
      console.log(ecoSeatsStart);
      if(seatNumber<ecoSeatsStart){
        businessSeats[seatNumber-1].isReserved = false;
        availableBusinessSeatsCount ++;
      }
      else{
        ecoSeats[seatNumber-ecoSeatsStart].isReserved = false;
        availableEcoSeatsCount++;
      }
    }
    console.log(flightSeats);
    console.log("---");
    console.log(businessSeats);
    console.log("__");
    console.log(ecoSeats);
    await FlightSeats.updateOne({flightId:flightId},{
       ecoSeats:ecoSeats,
       businessSeats:businessSeats,
       availableEcoSeatsCount: availableEcoSeatsCount,
       availableBusinessSeatsCount: availableBusinessSeatsCount
       });
  }
 
  async function processArray(reservations){
    var resultArray =[];
          console.log(reservations);
          for(var item in reservations) {
            console.log(reservations[item].cabinClass);
            const departureFlight = await Flight.find({_id: mongoose.Types.ObjectId(reservations[item].departureFlightId)});
            const returnFlight = await Flight.find({_id: mongoose.Types.ObjectId(reservations[item].returnFlightId)});
            var resultElement ={
              _id: reservations[item]._id,
              departureFlight: departureFlight[0],
              departureSeats: reservations[item].departureSeats,
              returnFlight: returnFlight[0],
              returnSeats: reservations[item].returnSeats,
              totalPrice: reservations[item].totalPrice,
              cabinClass :reservations[item].cabinClass
            }
            
            resultArray.push(resultElement);
          }
          return resultArray;
   }

   async function reserveFlightSeats (flightId,seats){
    //seats= seats[0].split(",");
    var allFlightSeats = await FlightSeats.find({flightId:flightId}).select(['availableEcoSeatsCount','availableBusinessSeatsCount','ecoSeats','businessSeats']);
    allFlightSeats = allFlightSeats[0];
    var ecoSeats = allFlightSeats['ecoSeats'];
    console.log(ecoSeats);
    var businessSeats = allFlightSeats['businessSeats'];
    var ecoSeatsCount = allFlightSeats['availableEcoSeatsCount'];
    var businessSeatsCount = allFlightSeats['availableBusinessSeatsCount'];
    var reservedBusiness = 0;
    for (var i = 0;i<seats.length;i++){
      if(parseInt(seats[i]) <ecoSeats[0]['id']){
        businessSeats[parseInt(seats[i])-1]['isReserved'] = true;
        reservedBusiness ++;
      }
      else{
        ecoSeats[parseInt(seats[i])-1-businessSeats.length]['isReserved'] = true;
      }
    }
    var reservedEco = seats.length-reservedBusiness;
    allFlightSeats['ecoSeats'] = ecoSeats;
    allFlightSeats['businessSeats'] = businessSeats;
    await FlightSeats.findOneAndUpdate({flightId:flightId},{ecoSeats:ecoSeats , businessSeats:businessSeats, 
      availableBusinessSeatsCount: businessSeatsCount-reservedBusiness, availableEcoSeatsCount: ecoSeatsCount-reservedEco});
  }

// MongoClient.
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
//register
signUp:async function(user,res){
  const takenUsername = await User.findOne({userName:user.username});
  const takenEmail = await User.findOne({email:user.email});
  if(takenUsername || takenEmail){
    res.json({message:"Username or email has already been taken"})
  }
  else{
    user.password = await bcrypt.hash(user.password,10)
    const dbUser = new User({
      userName:user.userName,
      password:user.password,
      firstName:user.firstName.toLowerCase(),
      lastName:user.lastName.toLowerCase(),
      gender:user.gender.toLowerCase(),
      country:user.country.toLowerCase(),
      telephoneNumber:user.telephoneNumber.toLowerCase(),
      email:user.email.toLowerCase(),
      passportNumber: user.passportNumber.toLowerCase(),
      dateOfBirth: user.dateOfBirth
    })
    dbUser.save();
    res.json({message:"Success"});
  }
      },
  
      //login
     login:async function(userLoggingIn,res){
       User.findOne({userName:userLoggingIn.userName})
       .then(dbUser => {
         if(!dbUser){
           return res.json({
             message:"Invalid Username or Password"
           })
         }
         bcrypt.compare(userLoggingIn.password,dbUser.password)
         .then(isCorrect =>{
           if(isCorrect){
           const payload = {
             userName: dbUser.userName,
             password: dbUser.password
           }
           jwt.sign(
             payload,
             "success",
             {expiresIn:86400},
             (err,token)=>{
               if(err) return res.json({message: err})
               return res.json({
                 message:"Success",
                 type: "User",
                 token:"Bearer"+token
               })
             }
           )
          }else{
            return res.json({
              message:"Invalid Username or Password"
            })
          }
         })
       })
      }
      ,

  adminLogin: async function(email,password,res){
    Admin.findOne({email:email})
    .then(dbAdmin => {
      if(!dbAdmin){
        return res.json({
          message:"Invalid Username or Password"
        })
      }
      var isCorrect = (password.localeCompare(dbAdmin.password)==0);
      if(isCorrect){
        const payload = {
          email: dbAdmin.email,
          password: dbAdmin.password
        }
        jwt.sign(
          payload,
          "success",
          {expiresIn:86400},
          (err,token)=>{
            if(err) return res.json({message: err})
            return res.json({
              message:"Success",
              type:"Admin",
              token:"Bearer"+token
            })
          }
        )
      }
      else{
        return res.json({
          message:"Invalid Username or Password"
        })
      }
      
    })
  },
  userAuthenticate: async function(user,pass,res){
    const valid = await User.exists({user:user,pass:pass},async(err,result)=>{
      if(err) res.status(500).send("Connection error");
      if(result==null){
        await User.exists({user:user},(err1,result1)=>{
          if(result1 == null) res.status(200).send("username doesn't exist");
          else res.status(200).send("wrong password");
        });
      }
      else{
        //res.status(200).send("success");
        const accessToken= generateAccessToken(user);
        const refreshToken= jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        console.log(refreshToken);

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      }
    });
    }
,
    checkToken:async function(req,res){
      const refreshToken = req.body.token;
      if (refreshToken == null) return res.sendStatus(404);
      if (!refreshTokens.includes(refreshToken)) return res.sendStatus(402);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(410)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
      })
    },
    deleteToken:async function(req,res){
      refreshTokens = refreshTokens.filter(token => token !== req.body.token)     
    },

    //register
    register:async function(user,res){
const takenUsername = await User.findOne({userName:user.username});
const takenEmail = await User.findOne({email:user.email});
if(takenUsername || takenEmail){
  res.json({message:"Username or email has already been taken"})
}
else{
  user.password = await bcrypt.hash(user.password,10)
  const dbUser = new User({
    userName:user.userName,
    password:user.password,
    firstName:user.firstName.toLowerCase(),
    lastName:user.lastName.toLowerCase(),
    gender:user.gender.toLowerCase(),
    country:user.country.toLowerCase(),
    telephoneNumber:user.telephoneNumber.toLowerCase(),
    email:user.email.toLowerCase(),
    passportNumber: user.passportNumber.toLowerCase()
  })
  dbUser.save();
  res.json({message:"Success"});
}
    },
    
    //login
   login:async function(userLoggingIn,res){
     User.findOne({userName:userLoggingIn.userName})
     .then(dbUser => {
       if(!dbUser){
         return res.json({
           message:"Invalid Username or Password"
         })
       }
       bcrypt.compare(userLoggingIn.password,dbUser.password)
       .then(isCorrect =>{
         if(isCorrect){
         const payload = {
           userName: dbUser.userName,
           password: dbUser.password
         }
         jwt.sign(
           payload,
           "sucess",
           {expiresIn:86400},
           (err,token)=>{
             if(err) return res.json({message: err})
             return res.json({
               message:"Success",
               token:"Bearer"+token
             })
           }
         )
        }else{
          return res.json({
            message:"Invalid Username or Password"
          })
        }
       })
     })
    }
    ,
    //Stripe
    createToken:async function(req,res){
      Stripe._createToken(req.body,function(err,result){
        if(err)
          res.send(err);
        else
        res.send({
          "message":"Token Created Successfully",
          "data": result
        });
      })
    }
 ,
    //charge
    createCharge:async function(req,res){
      Stripe._createCharge(req.body,function(err,result){
        if(err)
          res.send(err);
        else
        res.send({
          "message":"Charged Successfully",
          "data": result
        });
      })
    }
    ,
    createRefund: async function(req,res){
      Stripe._createRefund(req.body,function(err,result){
        if(err)
        res.send(err);
        else
        res.send({
          "message":"Refunded Successfully",
          "data":result
        });
      })
    },
    listCharges: async function(req,res){
      Stripe._listCharges(req.body,function(err,result){
        if(err)
        res.send(err);
        else
        res.send({
          "message":"Listed Successfully",
          "data":result
        });
      })

    },
  readFlight:async function(flightNumber,ecoSeatsCount,businessSeatsCount,arrivalAirportTerminal,departureAirportTerminal,arrivalDate,departureDate,res){
    // search with parameters
    const requestedFlights = await Flight.find({flightNumber:new RegExp(flightNumber,'i'),departureAirportTerminal:new RegExp(departureAirportTerminal,'i'),arrivalAirportTerminal:new RegExp(arrivalAirportTerminal,'i')})
    .where('departureDate').gte(departureDate) 
    .where('arrivalDate').lte(arrivalDate)
    .where('ecoSeatsCount').gte(ecoSeatsCount)
    .where('businessSeatsCount').gte(businessSeatsCount);
    res.status(200).send(requestedFlights);
  },
  readAllFlights:async function(res){
    // search with parameters
    const requestedFlights = await Flight.find();
     
    res.status(200).send(requestedFlights);
  },
  createFlight: async function (flight,res) {
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        await col.insertOne(flight,(err,result)=>{
          if (err)
          res.status(500).send("connection error");
          else
          //console.log(result)
          res.status(200).send(flight._id);
        });

        // create seats schema
        var ecoFlightSeats = [];
        var businessFlightSeats = [];
        const ecoSeatsCount = flight['ecoSeatsCount'];
        const businessSeatsCount = flight['businessSeatsCount'];
        for(var i = 0; i <businessSeatsCount; i++){
          var seat = new Seat({id:i+1,isReserved:false});
          businessFlightSeats.push(seat);
        }
        for(var i = businessSeatsCount; i <businessSeatsCount+ecoSeatsCount; i++){
          var seat = new Seat({id:i+1,isReserved:false});
          ecoFlightSeats.push(seat);
        }
        const flightSeats = new FlightSeats({flightId:flight._id,availableEcoSeatsCount:ecoSeatsCount,
        availableBusinessSeatsCount:businessSeatsCount,ecoSeats:ecoFlightSeats,businessSeats:businessFlightSeats});
        await flightSeats.save();
        // the end
    }
    catch(err){
      console.log(err);
    }
  
  },
  deleteFlight: async function (_id,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        await col.deleteOne({_id : mongoose.Types.ObjectId(_id)},(err,result)=>{
          console.log(result);
          if (err) return res.status(500).send(false);
            res.status(200).send(true);
        });
        try{ 
          await Reservation.deleteMany({departureFlightId:_id});
          await Reservation.deleteMany({returnFlightId:_id});
          await FlightSeats.deleteOne({flightId:_id});
        }catch(err){
          console.log(err);
        }
    }
    catch(err){
      console.log(err);
    }

  },
 updateFlight: async function (id, update,res){
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("flights");
        const p = await col.updateOne({"_id": mongoose.Types.ObjectId(id)}, update,(err,result)=>{
          // if (err)
          //   res.status(500).send(err);
          console.log(result);
          console.log(err);
          // else
            res.status(200).send("Flight updated");
        });
    }
    catch(err){
      console.log(err);
    }
  },
  
  createUser: async function (user,res) {
    try{
        const db = client.db("AirlineDB");
        const col = db.collection("users");
        user.password = await bcrypt.hash(user.password, 10);

        //console.log(user.password);
        await col.insertOne(user,(err,result)=>{
          if (err)
          res.status(500).send("connection error");
          else
          //console.log(result)
          res.status(200).send("user created successfully");
        });
    }
    catch(err){
      console.log(err);
    }
  },
  updateUserInfo: async function(userName, update, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("users");
      const p = await col.updateOne({"userName": userName}, update,(err,result)=>{
        // if (err)
        //   res.status(500).send(err);
        console.log(result);
        console.log(err);
        // else
          res.status(200).send("User updated");
      });
    }
    catch(err){
      console.log(err);
    }
  },
  updateSensitiveUserInfo: async function(userName, password, update, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("users");
      User.findOne({userName:userName})
      .then(dbUser => {
        if(!dbUser){
          return res.json({
            message:"Invalid Username or Password"
          })
        }
        bcrypt.compare(password,dbUser.password)
        .then(async isCorrect =>{
          if(isCorrect){
            if(update.$set.password!=""){
              update.$set.password = bcrypt.hash(update.$set.password,10);
          }
          const p = await col.updateOne({"userName": userName}, update,(err,result)=>{
            console.log(err);

            console.log(result);
            res.status(200).send("User updated");
          })
          // res.send("ok");
        }else{
           return res.json({
             message:"Invalid Username or Password"
           })
         }

      })
      });
    }
    catch(err){
      console.log(err);
    }
  },
  checkout: async function(reservation, res){
    const departureSeats = reservation.departureSeats;
    const returnSeats = reservation.returnSeats;
    const departureFlightId = reservation.departureFlightId;
    const returnFlightId = reservation.returnFlightId;
    const cabinClass = reservation.cabinClass;
    var totalPrice = 0;
    if(cabinClass=="business"){
      const departureBusinessSeatPrice = await Flight.findOne({_id:departureFlightId}).select(['businessSeatPrice'])['businessSeatPrice'];
      const returnBusinessSeatPrice = await Flight.findOne({_id:returnFlightId}).select(['businessSeatPrice'])['businessSeatPrice'];
      totalPrice = (departureSeats.length*departureBusinessSeatPrice)+(returnSeats.length*returnBusinessSeatPrice);
    }
    else{
      const departureEconomicSeatPrice = (await Flight.findOne({_id:departureFlightId}).select(['economicSeatPrice']))['economicSeatPrice'];
      const returnEconomicSeatPrice = (await Flight.findOne({_id:returnFlightId}).select(['economicSeatPrice']))['economicSeatPrice'];
      totalPrice = (departureSeats.length*departureEconomicSeatPrice)+(returnSeats.length*returnEconomicSeatPrice);
    }
    console.log(totalPrice)
    try{
    const charges = await stripe.charges.create({
      amount: totalPrice*100,
      currency: 'usd',
      source: "tok_visa",
      receipt_email: reservation.username+"@gmail.com"
    });
  }
    catch(e){
      console.log(e);
      console.log("payment failed");
    }
  },
  reserve: async function(reservation, res){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("reservations");
      await col.insertOne(reservation,(err,result)=>{
        if (err)    
        res.status(500).send(err);
        else
        //console.log(result)
        res.status(200).send(reservation._id);
      });
      // find the desired flightSeats
      //make the seats busy
      reserveFlightSeats(reservation.departureFlightId,reservation.departureSeats);
      reserveFlightSeats(reservation.returnFlightId,reservation.returnSeats);
  }
  catch(err){
    console.log(err);
  }
  },
  readReservation :async function(departureFlight, returnFlight, res){
    try{

       var d = departureFlight.departureDate;

      const requestedDepartureFlights = await Flight.find({departureAirportTerminal: new RegExp(departureFlight.departureAirportTerminal,'i'),
      arrivalAirportTerminal: new RegExp(departureFlight.arrivalAirportTerminal,'i')})
      .where('ecoSeatsCount').gte(departureFlight.ecoSeatsCount)
      .where('businessSeatsCount').gte(departureFlight.businessSeatsCount)
      .where('departureDate').gte(new Date(d.getFullYear(),d.getMonth(),d.getDate(),02,00,00,0))
      .where('departureDate').lte(new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,02,00,00,0));
      d = returnFlight.departureDate;

      // console.log(new Date(d.getFullYear(),d.getMonth(),d.getDate(),02,00,00,0));
      // console.log(new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,02,00,00,0));

      const requestedReturnFlights = await Flight.find({departureAirportTerminal: new RegExp(returnFlight.departureAirportTerminal,'i'),
        arrivalAirportTerminal: new RegExp(returnFlight.arrivalAirportTerminal,'i')})
        .where('ecoSeatsCount').gte(returnFlight.ecoSeatsCount)
        .where('businessSeatsCount').gte(returnFlight.businessSeatsCount)
        .where('departureDate').gte(new Date(d.getFullYear(),d.getMonth(),d.getDate(),02,00,00,0))
        .where('departureDate').lte(new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,02,00,00,0));
        
    res.status(200).send({"departureFlights":requestedDepartureFlights,"returnFlights":requestedReturnFlights});
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
  },
  deleteReservation: async function (_id,res){
    console.log(_id, "here is the _id");
    try{
      
        const db = client.db("AirlineDB");
        const col = db.collection("reservations");
        const reservation = await Reservation.find({_id: mongoose.Types.ObjectId(_id)});
        const user= await User.find({userName: reservation[0].username});
        const refundValue = reservation[0].totalPrice;
        const usermail= user[0].email;
        //console.log(_id);
        var departureId = reservation[0]['departureFlightId'];
        var departureSeats = reservation[0]['departureSeats'];
        var returnId = reservation[0]['returnFlightId'];
        var returnSeats = reservation[0]['returnSeats'];
        cancellationMail(usermail,refundValue);
        await col.deleteOne({_id : mongoose.Types.ObjectId(_id)},(err,result)=>{
          //console.log(result);
          if (err) return res.status(500).send(false);
            res.status(200).send(true);
        });
        console.log("b4 reverting seats");
        unreserveSeats(departureId,departureSeats);
        unreserveSeats(returnId,returnSeats);

    }
    catch(err){
      console.log(err);
    }
  },
  
  viewMyReservations:  async function (username ,res){
    try{
      console.log(username);
      const reservations = await Reservation.find({username: username});
      const resultArray = await processArray(reservations);
      res.status(200).send(resultArray);
    }
    catch(err){
      console.log(err);
    }
  },
  readFlightSeats: async function (_id,res){
    try{
      var flightSeats = [];
      console.log(mongoose.Types.ObjectId(_id));
      var ecoSeats = await FlightSeats.find({flightId:mongoose.Types.ObjectId(_id)}).select('ecoSeats').exec();
        //res.status(200).send(flightSeats);
      console.log(ecoSeats[0]['ecoSeats']);

      const businessSeats = await FlightSeats.find({flightId:mongoose.Types.ObjectId(_id)}).select('businessSeats').exec();
      console.log(businessSeats[0]['businessSeats']);

      var businessSpace = 0;
      var row = [];
      for(var i =0,c=0;i<(businessSeats[0]['businessSeats']).length;i++,c++){
        if(c==2 && businessSpace == 0){
          c=0;row.push(null);businessSpace = 1;
        }
        if(c==2 && businessSpace == 1){
          c=0;businessSpace = 0;
          flightSeats.push(row);row = [];
        }
        var seatObject = {
          id : businessSeats[0]['businessSeats'][i]['id'],
          number:  businessSeats[0]['businessSeats'][i]['id'],
          isReserved : businessSeats[0]['businessSeats'][i]['isReserved']
        }
        row.push(seatObject);
      }
      if(row.length !=0){
        flightSeats.push(row);row = [];
      }

      const index = flightSeats.length +1
      flightSeats.push([]);
      var ecoSpace = 0;
      for(var i =0,s1 = 0;i<ecoSeats[0]['ecoSeats'].length;i++,s1++){
        if(s1==2 && ecoSpace ==0){
          s1=0;row.push(null);ecoSpace=1;
        }
        if(s1==3 && ecoSpace ==1){
          s1=0;row.push(null);ecoSpace=2;
        }
        if(s1==2 && ecoSpace ==2){
          s1=0;ecoSpace=0;
          flightSeats.push(row);row = [];
        }
        var seatObject = {
          id : ecoSeats[0]['ecoSeats'][i]['id'],
          number : ecoSeats[0]['ecoSeats'][i]['id'],
          isReserved : ecoSeats[0]['ecoSeats'][i]['isReserved']
        }
        row.push(seatObject);
      }
      if(row.length !=0){
        flightSeats.push(row);row = [];
      }
      res.status(200).send({index: index , flightSeats: flightSeats});
    }
    catch(err){
      console.log(err);
    }

    },
    readFlightById: async function(_id,res){
      var flight = await Flight.findById(_id);
      res.status(200).send(flight);
    },
    viewUserInfo: async function(userName,res){
      try{
        const user = await User.find({userName: userName});
        res.status(200).send(user[0]);
      }
      catch(err){
        console.log(err);
      }
    },
    createToken:async function(req,res){
      Stripe._createToken(req.body,function(err,result){
        if(err)
          res.send(err);
        else
        res.send({
          "message":"Token Created Successfully",
          "data": result
        });
      })
    }
 ,
    //charge
    createCharge:async function(req,res){
      Stripe._createCharge(req.body,function(err,result){
        if(err)
          res.send(err);
        else
        res.send({
          "message":"Charged Successfully",
          "data": result
        });
      })
    }
    ,
    
    
};
function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15s' });
}