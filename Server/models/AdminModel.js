const DB = require('../db/conn');
const Flight = require('../schemas/Flight');

module.exports={
    createFlight: async function(req){
      console.log(req.body);

        let flight = new Flight(req.body);
        
        await DB.createFlight(flight,(err,res)=>{
          if (err) throw err;
          res.status(200).send("flight created");
        });

    },
    readFlight: async function(){

    },
    updateFlight: async function(req){
        
        await DB.updateFlight(req.body.search,{ $set: req.body.update});
    },
    deleteFlight: async function(req){
        await DB.deleteFlight(req.body.flightNumber);
    }
};