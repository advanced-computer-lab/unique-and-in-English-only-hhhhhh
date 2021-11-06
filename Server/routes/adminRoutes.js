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
    const result = adminController.authenticate(req);
    res.status(200).send(result);

    
});

router.route('/createFlight')
.post((req,res)=>{
    adminController.createFlight(req);
    res.send("post ya admin");
})

router.route('/readFlight')
.post((req,res)=>{
    adminController.readFlight(req);
    res.send("post ya admin");
});

router.route('/deleteFlight')
.delete((req,res)=>{
    adminController.deleteFlight(req);
    res.send("post ya admin");

})

router.route('/updateFlight')
.put((req,res)=>{
    adminController.updateFlight(req);
    res.send("post ya admin");
});

module.exports = router;

