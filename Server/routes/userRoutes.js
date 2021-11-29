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
router.route('/createUser')
.post((req,res)=>{
    userController.createUser(req,res);
});

router.route('/updateUserInfo')
.put((req,res)=>{
    userController.updateUserInfo(req,res);
});

module.exports = router;
