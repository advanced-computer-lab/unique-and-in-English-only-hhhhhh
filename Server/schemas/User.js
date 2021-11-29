const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userschema=new schema({
    _id:false,
    userName:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    country:{
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