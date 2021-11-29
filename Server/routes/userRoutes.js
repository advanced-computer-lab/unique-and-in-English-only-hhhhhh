const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/login')
.post((req,res)=>{
    res.status(200).send("hhh");
});

router.route('/readReservation')
.get((req,res)=>{
    
    
    userController.readAllReservations(req,res);
    
})
.post(async (req,res)=>{
    userController.readReservation(req,res);

});

router.route('/deleteReservation')
.post(async (req,res)=>{
    userController.deleteReservation(req,res);

});

router.route('/viewSummary')
.get(async (req,res)=>{
    userController.viewSummary(req,res);

});

router.route('/updateUser')
.put((req,res)=>{
    userController.updateUser(req,res);
});

module.exports = router;
