import { Grid } from '@mui/material';
import axios from 'axios';
import React from 'react'
import Ticket from '../Ticket'

const ReservedFlights = () => {
    // http://localhost:8000/user/viewMyReservations
    const [ flights , setFlights ] = React.useState();

    React.useEffect( async() => {
        const user = {
         username : 'konar'
        };
         await axios.post('http://localhost:8000/user/viewMyReservations', user)
             .then(result => {
               setFlights(result.data);
               console.log(flights);
               console.log(result.data);
             }).catch(err => {
                alert("Error with The Server "+ err );
           });

       }, [] );

    return (
        <div>

{ 
    flights.map((oneElement) =>
    <Grid key={oneElement.flightNumber}  item xs={4} sx={{minWidth: "450px"}}>

    <Ticket 
   passengerName = "konar"
   departureFlight = {oneElement.departureFlight}
   departureSeats={oneElement.departureSeats}
   returnFlight ={oneElement.returnFlight}
   returnSeats ={oneElement.returnSeats}
   cabinClass ={oneElement.cabinClass}
   />
    </Grid>


 )}

            
        </div>
    )
}

export default ReservedFlights
