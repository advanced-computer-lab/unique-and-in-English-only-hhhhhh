const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/login')
.post((req,res)=>{
   
    userController.login(req,res);
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

})
router.route('/viewUserInfo')
.post(async (req,res)=>{
    //res.send("asdasdasdas");
    userController.viewUserInfo(req,res);

})
router.route('/readFlightById').
post(async (req,res)=>{
    userController.readFlightById(req,res);
})
router.route('/checkout').
post(async (req,res)=>{
    userController.checkout(req,res);
})
router.route('/createToken').post((req,res) => {
    userController.createToken(req,res);
})
router.route('/createCharge').post((req,res) => {
  userController.createCharge(req,res);
})

router.route('/test').get(async (req,res)=>{
    userController.test(req,res);
});
router.route('/token').post( (req, res) => {
    userController.token(req,res);
  })
  router.route('/logout').delete ((req, res) => {
    userController.deleteToken(req,res);
  })
router.route('/updateReservation').
post(async (req,res)=>{
    userController.updateReservation(req,res);
})
router.route('/searchImage').
post(async (req,res)=>{
    // console.log(req.body.query);
    userController.searchImage(req,res);
})
router.route('/getUpdateDiff').
post(async (req,res)=>{
    // console.log(req.body.query);
    userController.getUpdateDiff(req,res);
})

module.exports = router;
