const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userschema=new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    countryCode:{
        type:String,
        required:true
    },
    telephoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passportNumber:{
        type:String,
        required:true
    },
},{timestamps:true})
const User=mongoose.model('User',userschema);
module.exports=User;