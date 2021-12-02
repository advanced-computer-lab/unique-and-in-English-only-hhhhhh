const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/login')
.post((req,res)=>{
   
    userController.authenticate(req,res);
});

router.route('/reserve')
.post((req,res)=>{
    userController.reserve(req,res);
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

router.route('/updateSensitiveUserInfo')
.put((req,res)=>{
    userController.updateSensitiveUserInfo(req,res);
});

router.route('/readFlightSeats')
.post((req,res)=>{
    userController.readFlightSeats(req,res);
})
router.route('/viewMyReservation')
.post(async (req,res)=>{
    //res.send("asdasdasdas");
    userController.viewMyReservations(req,res);

});router.route('/token').post( (req, res) => {
    userController.token(req,res);
  })
  router.route('/logout').delete ((req, res) => {
    userController.deleteToken(req,res);
  })

module.exports = router;
