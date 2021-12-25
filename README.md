# unique-and-in-English-only-hhhhhh #

#Project Title#: Zeyad Tyara air travel agecy  website.

It's a website for Those who love travelling and adventure!
- As a user you can book you can view all the available flights with all the search filters that helps you find the flight that suits you the best.
- You can book the flight online, cancel it, ..etc (the user part is not implemented yet in sprint 1.)
 
- As an Admin, you can create new flights, view all the available flights using filters to search among them, edit available flights and delete them with ease simply by pressing on buttons that exist on the flight cards. 
- All changes done by the admin are reflected instantaneously on the backend and the DB.
 The website is implemeted using the MERN stack( Mern stands for MongoDB- Express- React- NodeJS) and the DB is hosted on the cloud using MongoDB free plan.   



Motivation: 
The project was created as instructed in the Advanced Computer Lap course. We, frankly speaking, did it for the grades :D, but also to have fun and test our self-learning and programming skills as future computer engineers. 

Build Status:The Project is working perfectly without any errors or bugs


Code Style:
The Project is split in to two parts Client side which represents the frontend, and the Server side which represents the backend.
The Model-View-Controller style was used in the project's backend side. Their is a folder dedicated for each category(Model-View-Controller) for each category of users(Admin-Guest-User).
The client side is split into components that each component is the front-end that maps to a functionality in the backend.



Screenshots:Search for your desired flight from the homepage directly.

Login Portal
![image](https://user-images.githubusercontent.com/82762206/147352812-873973a1-4410-4d75-b8d3-a9b8f04ecd2c.png)
Signup Portal
![image](https://user-images.githubusercontent.com/82762206/147352950-2617e407-b2cb-470e-998d-d539cbd8cb47.png)
Creating a new flight(exclusive for admins only)
![image](https://user-images.githubusercontent.com/82762206/147359496-9e3e9c15-27d1-4466-89a1-f46310f6c584.png)

Editing or deleting an existent flight(exclusive for admins only)
![image](https://user-images.githubusercontent.com/82762206/147359684-38b58c1d-3fd7-4a27-a633-f5a80afd00d4.png)
![image](https://user-images.githubusercontent.com/82762206/147359765-25bbcbc7-de76-401c-aaa6-446ead4ba5aa.png)

Reserving a Flight(Users)
![image](https://user-images.githubusercontent.com/82762206/147392593-569afc35-f22a-499c-b65f-39dc4eaca290.png)
![image](https://user-images.githubusercontent.com/82762206/147392602-c34bc662-7485-4679-8546-242260374664.png)
![image](https://user-images.githubusercontent.com/82762206/147392654-d3466269-5b30-4d79-942e-ddcf0d5f2d08.png)

Payment for Reservation(Users)
![image](https://user-images.githubusercontent.com/82762206/147392729-e1f89d0f-2dac-433a-9211-287b56ee26d4.png)
![image](https://user-images.githubusercontent.com/82762206/147392737-1816f229-cd4f-4a66-8fb7-83249b544a24.png)

Updating personal info(Users)

![image](https://user-images.githubusercontent.com/82762206/147392765-b9886719-a0fb-4d84-b9d4-0677f4a6b1d9.png)

View/Cancel/Edit my resrvations(Users)

![image](https://user-images.githubusercontent.com/82762206/147392795-5e25af80-0f06-4094-a399-91c10b4bdebc.png)

Edit reservation(Users)

![image](https://user-images.githubusercontent.com/82762206/147392896-2e6b061e-cf3e-47b0-838a-c054b99ec28f.png)









Tech/Framework used:MongoDB-Express Routing-React Js-Node Js (MERN Stack)

Features:1-Users can Login by Facebook without the need to signup
         2-Admin can create flights
         3-Admin can edit existent flights
         4-Admin can delete existent flights
         5-User can search flights
         6-User can reserve a flight
         7- it is a must for user to reserve departure and return flights at the time of reservation
         8-User must pay for a reserved flight at the time of reservation
         9-An email will be sent to the user once the payment for the reservation is complete
         10-User can cancel his flight
         11-An email will be sent automatically when the user cancels his reservation
         12-User can edit their personal information(passport number-password-first name-last name-telephone number)
         
Code Examples:
#######
The code for creating a flight in the backend
```

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
  ```

 #######
 The code for reserving a flight(backend)
 ```

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
          res.status(500).send("u r broke");
          return;
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
            if(err){
              chargeRes = {
                "message":"failed",
                "data": null
              };
              res.status(500).send("u r broke");
              return;
            }
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
      console.log(reservation.username);
      const email = (await User.findOne({userName:reservation.username})).email;
      console.log("email"+email);
      const reservationEmail = {
        cabinClass: reservation.cabinClass,
        departureSeats: reservation.departureSeats,
        returnSeats: reservation.returnSeats,
        departureDate1:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.departureFlightId)})).departureDate,
        departureDate2:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.departureFlightId)})).arrivalDate,
        returnDate1:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.returnFlightId)})).departureDate,
        returnDate2:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.returnFlightId)})).arrivalDate,
        departureTerminal1:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.departureFlightId)})).departureAirportTerminal,
        departureTerminal2:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.departureFlightId)})).arrivalAirportTerminal,
        returnTerminal1:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.returnFlightId)})).departureAirportTerminal,
        returnTerminal:(await Flight.findOne({_id:mongoose.Types.ObjectId(reservation.returnFlightId)})).arrivalAirportTerminal
      }
      confirmPaymentMail(email,reservation.totalPrice,reservationEmail,"pay",0);
  }
  catch(err){
    unreserveSeats(reservation.departureFlightId,reservation.departureSeats);
    unreserveSeats(reservation.returnFlightId,reservation.returnSeats);
    console.log(err);
  }
  },
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
  ```

  ########
  login mehod and jwt authentication(backend)
  ```

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
    ############
    updating a flight(backend)
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
  ```

  ############
  deleting a flight(backend)
  ```

  
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
  ```

  #######
  displaying seats during reservation(frontend)
  ```

 import React, { Component } from "react";
import SeatPicker from "react-seat-picker";

export default class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: this.props.seat
    };
  }

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.props.setSelected((prevItems) => [...prevItems, id]);
    const newTooltip = `You Have Selected Seat row ${row}, number ${number} in Your Desired Class`;
    addCb(row, number, id, newTooltip);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.props.setSelected((list) => list.filter((item) => item !== id));
    removeCb(row, number);
  };

  // componentDidMount() {
  //  console.log(this.props.seat);
  // }
  componentDidUpdate() {
    console.log(this.props.seat);
    this.state.seats = this.props.seat;
  }

  render() {
    
    return (
      <div >
        <SeatPicker
          addSeatCallback={this.addSeatCallback.bind(this)}
          removeSeatCallback={this.removeSeatCallback.bind(this)}
          rows={this.props.seat}
          maxReservableSeats={parseInt(this.props.maxNumber) }
          visible
          selectedByDefault
          loading={false}
        />
      </div>
    );
  }
}
```

######
A ticket card which holds the info about a flight that can be flipped(frontend)
```
import { Button } from "@mui/material";
import React from "react";
import ReactCardFlip from 'react-card-flip';
import UserFlightCard from "./UserFlightCard";

export default class App extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false,
        store : true
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    handleReload(){
      this.props.reload(  this.state.store );
      this.setState(prevState => ({ store: !prevState.store }));  
    }
    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard
                      reservationId = { this.props.reservationId}
                      _id = {this.props.departureFlight._id}
                      flightNumber= {this.props.departureFlight.flightNumber}
                      ecoSeatsCount= {this.props.departureFlight.ecoSeatsCount}
                      economicSeatPrice= {this.props.departureFlight.economicSeatPrice}
                      businessSeatsCount= {this.props.departureFlight.businessSeatsCount}
                      businessSeatPrice= {this.props.departureFlight.businessSeatPrice}
                      departureDate= {this.props.departureFlight.departureDate}
                      arrivalDate= {this.props.departureFlight.arrivalDate}
                      departureAirportTerminal= {this.props.departureFlight.departureAirportTerminal}
                      arrivalAirportTerminal= {this.props.departureFlight.arrivalAirportTerminal}
                      seats = {this.props.departureSeats}
                      cabinClass = {this.props.cabinClass}
                      passengerName = {this.props.passengerName}
                      totalPrice = {this.props.totalPrice}
                      reservationId = {this.props.reservationId}
                      type = "Departure Flight"
                      reload = { (val) => this.handleReload(val) }
                      travelDate = { this.props.departureFlight.departureDate }
                      returnDate = { this.props.returnFlight.departureDate }
                    />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
          
            
  
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard
                    reservationId = { this.props.reservationId}
                    _id = {this.props.returnFlight._id}
                    flightNumber= {this.props.returnFlight.flightNumber}
                    ecoSeatsCount= {this.props.returnFlight.ecoSeatsCount}
                    economicSeatPrice= {this.props.returnFlight.economicSeatPrice}
                    businessSeatsCount= {this.props.returnFlight.businessSeatsCount}
                    businessSeatPrice= {this.props.returnFlight.businessSeatPrice}
                    departureDate= {this.props.returnFlight.departureDate}
                    arrivalDate= {this.props.returnFlight.arrivalDate}
                    departureAirportTerminal= {this.props.returnFlight.departureAirportTerminal}
                    arrivalAirportTerminal= {this.props.returnFlight.arrivalAirportTerminal}
                    seats = {this.props.returnSeats}
                    cabinClass = {this.props.cabinClass}
                    passengerName = {this.props.passengerName}
                    totalPrice = {this.props.totalPrice}
                    reservationId = {this.props.reservationId}
                    type = "Return Flight"
                    reload = { (val) => this.handleReload(val) }
                    travelDate = { this.props.departureFlight.departureDate }
                    returnDate = { this.props.returnFlight.departureDate }
                     />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
            
        </ReactCardFlip>
      )
    }
  }
  
```
######


 
Installation:1-install npm
```
npm install
```
2-install module express
```
npm i express
```
3-install module cors
```
npm i cors
```
4-install module bcrypt
```
npm i bcrypt
```
5-install stripe
```
npm i stripe
```


API reference:
https://nodemailer.com/about/

https://stripe.com/docs/api/authentication

https://unsplash.com/documentation

Tests:Use postman application in testing backend functions before integrating the functions with the frontend and use chrome developer tools

Postman download link:https://www.postman.com/downloads/




How to Use:The project is split to two parts frontend and backend.
Both parts must be run to see the full functionality of the flight reservation system.
################################################################
In order to run the backend part:
1-open the console.
2-change directory to Server
```
cd Server
```
3-run the backend by using
```
node index
```
################################################################

Now that we have run the back let's run the front end:
1-open a new terminal
2-change directory to Client
```
cd Client
```
3-start the front-end by writing this to the console
```
npm start
```
Your default browser will load the website and you can navigate through it normally.
If you want to login as an admin you will have to write the route yourself /adminLogin



Contribute:
You can contribute by sending your feedback on email airlineszeyad@gmail.com


Credits:

Mohamed Mahmoud Abdulatif Konar

Mahmoud Ahmed Abdelkhaleq

Ali Helmy Youssef

Zeyad Elsaed Elnagar

Omar Usama Mahmoud Elnagar

