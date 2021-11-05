const express = require('express');
const router = express.Router();
const Admin = require("../models/Admin");
const Flight = require('../models/flight');

const adminController = require('../controllers/adminController');
const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');



router.route('/login')
.get((req,res)=>{
    //return admin login page
    console.log(1);
    res.send("login, bitch");
})
.post((req,res)=>{
    //verify admin's data and move to home page
    

    
});


router.route('/flights')
.get((req,res)=>{
    res.send("flkoags[dkpf'aadmin");
})
.post((req,res)=>{

    //assuming we have the parameterss for create and they're correct
    adminController.createFlight(req);
//     const flight = new Flight({flightNumber:'sad',
//     ecoSeatsCount:15,
//     businessSeatsCount:16,
//     departureTime:"sanld",
//     arrivalTime:'sad',
//     departureDate:new Date(2000,8,8),
//     arrivalDate:new Date(2000,1,22),
//     departureAirportTerminal:'sad',
//     arrivalAirportTerminal:'sad'
// });
   
    res.send("post ya admin");
})



module.exports = router;

