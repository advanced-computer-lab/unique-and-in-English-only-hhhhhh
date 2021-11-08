const express = require('express');
const router = express.Router();
//const Admin = require("../schemas/Admin");
//const Flight = require('../schemas/flight');

const adminController = require('../controllers/adminController');




router.route('/login')
.post((req,res)=>{
    const result = adminController.authenticate(req,res);
});

router.route('/createFlight')
.post((req,res)=>{
    adminController.createFlight(req,res);
})

router.route('/readFlight')
.get((req,res)=>{
    
   
    adminController.readAllFlights(res).then(result =>{
    });
    
})
.post((req,res)=>{
    adminController.readFlight(req,res).then(result =>{
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

