const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/login')
.post((req,res)=>{
    res.status(200).send("hhh");
    userController.authenticate(req,res);
});

router.route('/readFlight')
.get((req,res)=>{
    
    
    res.status(200).send("hhh");
    
})

router.route('/deleteReservation')
.post(async (req,res)=>{
    res.status(200).send("hhh");

});

router.route('/updateUser')
.put((req,res)=>{
    res.status(200).send("hhh");
});

module.exports = router;
router.route('/token').post( (req, res) => {
    userController.token(req,res);
  })
router.route('/logout').delete ((req, res) => {
    userController.deleteToken(req,res);
  })
  