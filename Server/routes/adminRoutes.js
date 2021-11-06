const express = require('express');
const router = express.Router();
//const Admin = require("../schemas/Admin");
//const Flight = require('../schemas/flight');

const adminController = require('../controllers/adminController');




router.route('/login')
.get((req,res)=>{
    //return admin login page
    console.log(1);
    res.send("login, bitch");
})
.post((req,res)=>{
    const result = adminController.authenticate(req,res);
    // res.status(200).send(result);
});

router.route('/createFlight')
.post((req,res)=>{
    adminController.createFlight(req,res);
})

router.route('/readFlight')
.get((req,res)=>{
    
    const dummyFlight = {
        "flightNumber":"",
        "ecoSeatsCount":0,
        "businessSeatsCount":0,
        "departureDate":"",
        "arrivalDate":"",
        "departureAirportTerminal":"",
        "arrivalAirportTerminal":""
    };
    adminController.readAllFlights(dummyFlight,res).then(result =>{
        console.log(result);
    });
    
})
.post((req,res)=>{
    adminController.readFlight(req,res).then(result =>{
        console.log(result);
    });
    
});

router.route('/deleteFlight')
.delete(async (req,res)=>{

    await adminController.deleteFlight(req,res);

});

router.route('/updateFlight')
.put((req,res)=>{
    adminController.updateFlight(req,res);
});

module.exports = router;
