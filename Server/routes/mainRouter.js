const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.route('/login')
.get((req,res)=>{
    //return login page
    console.log(1);
})
.post((req,res)=>{
    //verify user's data and move to home page
    console.log(2);
});

router.route('/sign-up')
.get(async(req,res)=>{
    //return sign up page
    console.log(3);

    const user =new User({
        firstName:'aa',
        lastName:'about my new blog',
        homeAddress:'more about my new blog',
        countryCode:'more about my new blog',
        telephoneNumber:'more about my new blog',
        email:'more about my new blog',
        passportNumber:'more about my new blog',
      });
      await user.save().then((result)=>{
          res.send(result);
      }).catch((err)=>{
         console.log(err);
      });
})
.post((req,res)=>{
    //verify user's data and move to login page
    console.log(4);
});

module.exports = router;