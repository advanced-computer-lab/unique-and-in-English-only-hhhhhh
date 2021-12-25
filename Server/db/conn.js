const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Flight = require("../schemas/Flight");
const Admin = require("../schemas/Admin");
var nodemailer = require('nodemailer');
const Reservation = require("../schemas/Reservation");
const User = require ("../schemas/User");
const FlightSeats = require("../schemas/FlightSeats");
const Seat = require("../schemas/Seat");
const https = require('https');


const Db = process.env.ATLAS_URI;
const mail=process.env.GMAIL_USERNAME;
const mailpass=process.env.GMAIL_PASSWORD;
console.log(Db);
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Stripe = require("../stripe/stripe");

let refreshTokens = [];

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

    // console.log(seats);

    for(var seat in seats){
      // console.log("still inside the loop");
      
      var seatNumber = parseInt(seats[seat]);
      // console.log(seatNumber);
      // console.log(ecoSeatsStart);
      if(seatNumber<ecoSeatsStart){
        businessSeats[seatNumber-1].isReserved = false;
        availableBusinessSeatsCount ++;
      }
      else{
        ecoSeats[seatNumber-ecoSeatsStart].isReserved = false;
        availableEcoSeatsCount++;
      }
    }
    // console.log(flightSeats);
    // console.log("---");
    // console.log(businessSeats);
    // console.log("__");
    // console.log(ecoSeats);
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
   async function token(cardInfo,tokenData){
    //console.log(1);
    await Stripe._createToken(cardInfo,function(err,result){
      // console.log(2);
      //console.log(err);
       console.log(result);
      if(err){
        tokenData = {
          "message":"failed",
          "data": null
      };
    }
    else{
      tokenData = {
        "message":"Token Created Successfully",
        "data": result
      };
    }
    }
      );
    }

    async function charge(paymentInfo){
      await Stripe._createCharge(paymentInfo,function(err,result){
        if(err)
          return {
            "message":"failed",
            "data": null
          };
        return{
          "message":"Charged Successfully",
          "data": result
        };
      })
    }


   async function reserveFlightSeats (flightId,seats){
    //seats= seats[0].split(",");
    var allFlightSeats = await FlightSeats.find({flightId:flightId}).select(['availableEcoSeatsCount','availableBusinessSeatsCount','ecoSeats','businessSeats']);
    allFlightSeats = allFlightSeats[0];
    console.log(flightId);
    var ecoSeats = allFlightSeats['ecoSeats'];
    //console.log(ecoSeats);
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
      // console.log(seats[i]);
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
searchImage: async function(query,res) {
  
    
     
    const axios = require('axios');

    axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_KEY}`)
      .then(response => {
        res.status(200).send({total: response.data.total, image_URL:(response.data.total==0)?
          "https://media.gemini.media/img/large/2021/7/15/2021_7_15_23_59_18_304.jpg" 
           : response.data.results[0].urls.regular });
      })
      .catch(error => {
        console.log(error);
      });
  
     
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
              username: dbAdmin.username,
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
          res.status(200).send(user.userName);
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
      const departureBusinessSeatPrice = await Flight.findOne({id:departureFlightId}).select(['businessSeatPrice'])['businessSeatPrice'];
      const returnBusinessSeatPrice = await Flight.findOne({id:returnFlightId}).select(['businessSeatPrice'])['businessSeatPrice'];
      totalPrice = (departureSeats.length*departureBusinessSeatPrice)+(returnSeats.length*returnBusinessSeatPrice);
    }
    else{
      const departureEconomicSeatPrice = await Flight.findOne({id:departureFlightId}).select(['economicSeatPrice'])['economicSeatPrice'];
      const returnEconomicSeatPrice = await Flight.findOne({id:returnFlightId}).select(['economicSeatPrice'])['economicSeatPrice'];
      totalPrice = (departureSeats.length*departureEconomicSeatPrice)+(returnSeats.length*returnEconomicSeatPrice);
    }
    res.status(200).send(session.url);
  },
  reserve: async function(reservation, res, cardInfo){
    try{
      const db = client.db("AirlineDB");
      const col = db.collection("reservations");
      reservation.departureSeats = reservation.departureSeats.map( reserv => {reserv = parseInt(reserv); return reserv;});
      reservation.returnSeats = reservation.returnSeats.map( reserv => {reserv = parseInt(reserv); return reserv;});
      await col.insertOne(reservation,async (err,result)=>{
        if (err)    
        res.status(500).send(err);
        else{
        //console.log(result)
        await Stripe._createToken(cardInfo,function(err,result){
          // console.log(2);
          //console.log(err);
           console.log(result);
          if(err){
            tokenData = {
              "message":"failed",
              "data": null
          };
        }
        else{
          tokenData = {
            "message":"Token Created Successfully",
            "data": result
          };
        }
        console.log(tokenData);
          if(tokenData.message == "failed"){
            res.status(500).send("You are broke");
            return;
          }
          const chargeData = {
            "amount": reservation.totalPrice,
            "currency":"usd",
            "token":tokenData.data.id,
            "description": "reservation " + reservation._id
          }
          var chargeRes;
          Stripe._createCharge(chargeData,function(err,result){
            if(err)
              chargeRes = {
                "message":"failed",
                "data": null
              };
              else{
              chargeRes = {
                "message":"Charged Successfully",
                "data": result
            };
            if(chargeRes.message == "failed"){
              res.status(500).send("You are broke");
              return;
            }
          }
          })
          res.status(200).send(reservation._id);
        });
      }
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
  readFlightSeats: async function (_id, reservedSeats ,res){
    try{
      var flightSeats = [];
      // console.log(mongoose.Types.ObjectId(_id));
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
          isReserved : reservedSeats.includes(businessSeats[0]['businessSeats'][i]['id'] ) ? false : businessSeats[0]['businessSeats'][i]['isReserved'],
          isSelected : reservedSeats.includes(businessSeats[0]['businessSeats'][i]['id'] ) ? true : false

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
          isReserved : reservedSeats.includes(ecoSeats[0]['ecoSeats'][i]['id']) ? false : ecoSeats[0]['ecoSeats'][i]['isReserved'],
          isSelected : reservedSeats.includes(ecoSeats[0]['ecoSeats'][i]['id']) ? true : false
        }
        row.push(seatObject);
      }
      if(row.length !=0){
        flightSeats.push(row);row = [];
      }
      console.log(reservedSeats);
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
    updateReservation: async function(_id,update,res){
      try{
        const db = client.db("AirlineDB");
        const col = db.collection("reservations");
        const oldReservation = await Reservation.findOne({_id: mongoose.Types.ObjectId(_id)});
        // console.log( oldReservation.departureSeats );
        // console.log( oldReservation );
        const oldDepartureSeats = oldReservation.departureSeats;
        const oldReturnSeats = oldReservation.returnSeats;
        const oldTotalPrice = oldReservation.totalPrice;
        var newTotalPrice = oldTotalPrice;
        // console.log(newTotalPrice);
        const returnFlightId = (update.returnFlightId=="" || !update.returnFlightId)? oldReservation.returnFlightId:update.returnFlightId;
        const departureFlightId = (update.departureFlightId=="" || !update.departureFlightId) ? oldReservation.departureFlightId:update.departureFlightId;
        if(update.departureSeats != "" && update.departureSeats){
          unreserveSeats(oldReservation.departureFlightId,oldDepartureSeats);
          reserveFlightSeats(departureFlightId,update.departureSeats);
          const oldPrice = (oldReservation.cabinClass=="economic") ? 
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).economicSeatPrice:
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).businessSeatPrice;
          var newPrice;
          if(update.cabinClass=="economic"){
            newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).economicSeatPrice;
          }
          else{
            if(update.cabinClass == "business"){
              newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).businessSeatPrice;
            }
            else{
              if(oldReservation.cabinClass=="economic"){
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).economicSeatPrice;
              }
              else{
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).businessSeatPrice;
              }

            }
          }
          console.log(newPrice);
          newTotalPrice = newTotalPrice + update.departureSeats.length*newPrice - oldDepartureSeats.length*oldPrice;
          console.log(newTotalPrice);
        }
        if(update.returnSeats != "" && update.returnSeats){
          unreserveSeats(oldReservation.returnFlightId,oldReturnSeats);
          reserveFlightSeats(returnFlightId,update.returnSeats);
          const oldPrice = (oldReservation.cabinClass=="economic") ? 
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).economicSeatPrice:
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).businessSeatPrice;
          if(update.cabinClass=="economic"){
            newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).economicSeatPrice;
          }
          else{
            if(update.cabinClass == "business"){
              newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).businessSeatPrice;
            }
            else{
              if(oldReservation.cabinClass=="economic"){
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).economicSeatPrice;
              }
              else{
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).businessSeatPrice;
              }

            }
          }
          newTotalPrice = newTotalPrice + update.returnSeats.length*newPrice - oldReturnSeats.length*oldPrice;
        }
        update["departureFlightId"] = departureFlightId;
        update["returnFlightId"] = returnFlightId;
        update["cabinClass"] = (update["cabinClass"]=="" || !update["cabinClass"])? oldReservation.cabinClass:update["cabinClass"];
        update["returnSeats"] = (update["returnSeats"].length==0 || !update["returnSeats"])? oldReservation.returnSeats:update["returnSeats"];
        update["departureSeats"] = (update["departureSeats"].length==0 || !update["departureSeats"])? oldReservation.departureSeats:update["departureSeats"];
        update["totalPrice"] = newTotalPrice;
        const difference = newTotalPrice - oldTotalPrice;
        console.log(update);
        const p = await col.updateOne({_id: mongoose.Types.ObjectId(_id)}, {$set: update},(err,result)=>{
        if (err)
          res.status(500).send(err);
        // console.log(result);
        res.status(200).send("reservation updated");});
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
    getUpdateDiff: async function(_id,update,res){
      try{
        const db = client.db("AirlineDB");
        const col = db.collection("reservations");
        const oldReservation = await Reservation.findOne({_id: mongoose.Types.ObjectId(_id)});
        const oldDepartureSeats = oldReservation.departureSeats;
        const oldReturnSeats = oldReservation.returnSeats;
        const oldTotalPrice = oldReservation.totalPrice;
        var newTotalPrice = oldTotalPrice;
        // console.log(newTotalPrice);
        const returnFlightId = (update.returnFlightId=="" || !update.returnFlightId)? oldReservation.returnFlightId:update.returnFlightId;
        const departureFlightId = (update.departureFlightId=="" || !update.departureFlightId) ? oldReservation.departureFlightId:update.departureFlightId;
        if(update.departureSeats != "" && update.departureSeats){
          // unreserveSeats(oldReservation.departureFlightId,oldDepartureSeats);
          // reserveFlightSeats(departureFlightId,update.departureSeats);
          const oldPrice = (oldReservation.cabinClass=="economic") ? 
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).economicSeatPrice:
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).businessSeatPrice;
          var newPrice;
          if(update.cabinClass=="economic"){
            newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).economicSeatPrice;
          }
          else{
            if(update.cabinClass == "business"){
              newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).businessSeatPrice;
            }
            else{
              if(oldReservation.cabinClass=="economic"){
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).economicSeatPrice;
              }
              else{
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(departureFlightId)})).businessSeatPrice;
              }

            }
          }
          console.log(newPrice);
          newTotalPrice = newTotalPrice + update.departureSeats.length*newPrice - oldDepartureSeats.length*oldPrice;
          console.log(newTotalPrice);
        }
        if(update.returnSeats != "" && update.returnSeats){
          // unreserveSeats(oldReservation.returnFlightId,oldReturnSeats);
          // reserveFlightSeats(returnFlightId,update.returnSeats);
          const oldPrice = (oldReservation.cabinClass=="economic") ? 
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).economicSeatPrice:
          (await Flight.findOne({_id:mongoose.Types.ObjectId(oldReservation.departureFlightId)})).businessSeatPrice;
          if(update.cabinClass=="economic"){
            newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).economicSeatPrice;
          }
          else{
            if(update.cabinClass == "business"){
              newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).businessSeatPrice;
            }
            else{
              if(oldReservation.cabinClass=="economic"){
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).economicSeatPrice;
              }
              else{
                newPrice = (await Flight.findOne({_id:mongoose.Types.ObjectId(returnFlightId)})).businessSeatPrice;
              }

            }
          }
          newTotalPrice = newTotalPrice + update.returnSeats.length*newPrice - oldReturnSeats.length*oldPrice;
        }
        const difference = newTotalPrice - oldTotalPrice;

        res.status(200).send({difference: difference});
      }
      catch(err){
        console.log(err);
      }

    },
    
    
};
function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15s' });
}