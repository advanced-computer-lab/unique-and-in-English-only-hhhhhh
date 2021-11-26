const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.route('/editProfile')
.put((req,res)=>{
    userController.editProfile(req,res);
});
module.exports = router;