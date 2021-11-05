const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');




router.route('/login')
.get((req,res)=>{
    console.log( new Date(2021,11-1,5,6,6,6) );
});

router.route('/createFlight')
.post((req,res)=>{
    adminController.createFlight(req);
    res.send("post ya admin");

})

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

