import { Grid } from '@mui/material';
import axios from 'axios';
import React from 'react'
import Ticket from '../Ticket'

const ReservedFlights = () => {
    // http://localhost:8000/user/viewMyReservations
    const [ flights , setFlights ] = React.useState();

    React.useEffect( async() => {
        console.log(15);
        const user = {
            username: "konar"
         };
        console.log(1);

         await axios.post('http://localhost:8000/user/viewMyReservations', user)
             .then(result => {
               setFlights(result.data);
               console.log(flights);
               console.log(result.data);
             }).catch(err => {
                console.log(5);
                alert("Error with The Server " + err );
                

           });
           console.log(0);


       }, [] );

    return (
        <div>

{/* { 
//     flights.map((oneElement) =>
//     <Grid key={oneElement.flightNumber}  item xs={4} sx={{minWidth: "450px"}}>

//     <Ticket 
//    passengerName = "konar"
//    departureFlight = {oneElement.departureFlight}
//    departureSeats={oneElement.departureSeats}
//    returnFlight ={oneElement.returnFlight}
//    returnSeats ={oneElement.returnSeats}
//    cabinClass ={oneElement.cabinClass}
//    />
//     </Grid>


 )} */}

            
        </div>
    )
}

export default ReservedFlights
