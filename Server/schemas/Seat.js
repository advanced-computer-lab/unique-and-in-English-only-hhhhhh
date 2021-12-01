const mongoose=require('mongoose');
const schema=mongoose.Schema;
const DB = require('../db/conn');
const seatSchema = new schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    isReserved:{
        type: Boolean,
        required: true,
    },
    
});
module.exports = mongoose.model('Seat',seatSchema);