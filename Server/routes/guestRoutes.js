const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guestController');


router.route('/sign-up')
.post((req,res)=>{
    guestController.signUp(req,res);
   // res.status(200).send(res);
});
module.exports = router;