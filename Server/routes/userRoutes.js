const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/login')
.post((req,res)=>{
    res.status(200).send("hhh");
});

router.route('/readFlight')
.get((req,res)=>{
    
    
    res.status(200).send("hhh");
    
})
.post(async (req,res)=>{
    userController.readFlight(req,res);

});

router.route('/deleteReservation')
.post(async (req,res)=>{
    res.status(200).send("hhh");

});

router.route('/updateUser')
.put((req,res)=>{
    res.status(200).send("hhh");
});

module.exports = router;
