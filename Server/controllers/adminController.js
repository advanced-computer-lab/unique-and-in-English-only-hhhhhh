const adminModel = require('../models/Admin');
const flightModel = require('../models/Flight');

module.exports = {
    authenticate: async function(){
    
    },
    createFlight: async function(req){
        flightModel.createFlight(req);
    },
    readFlight: async function(){

    },
    updateFlight: async function(){

    },
    deleteFlight: async function(){

    },
    
}