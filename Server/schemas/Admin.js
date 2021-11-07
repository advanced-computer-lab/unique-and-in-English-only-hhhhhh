const mongoose=require('mongoose');
const schema=mongoose.Schema;
const adminschema=new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})
const Admin=mongoose.model('Admin',adminschema);
module.exports= Admin;