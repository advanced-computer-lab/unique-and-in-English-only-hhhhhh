const express = require('express');
const router = express.Router();
//const Admin = require("../schemas/Admin");
//const Flight = require('../schemas/flight');

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
    const result = adminController.authenticate(req);
    res.status(200).send(result);

    
});


router.route('/flights')
.get((req,res)=>{
    res.send("flkoags[dkpf'aadmin");
})
.post((req,res)=>{

    //assuming we have the parameterss for create and they're correct
    console.log(1);
    const a = adminController.readFlight(req);
    a.then(function(result) {
        console.log(result) // "Some User token"
    })
    //res.json(a);
    res.send(a);

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
   
    //res.send("post ya admin");
})



module.exports = router;

