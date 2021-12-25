import { Grid, Typography } from '@mui/material';
import { width } from '@mui/system';
import axios from 'axios';
import React from 'react'
import Ticket from '../Ticket'

const ReservedFlights = () => {
    
    const [ flights , setFlights ] = React.useState([]);
    const [ user , setUser ]= React.useState({username: localStorage.getItem('username')});
    const [ reload , setReload ] = React.useState( false );

    React.useEffect( async() => {

         await axios.post('http://localhost:8000/user/viewMyReservation', user)
             .then(result => {
               setFlights(result.data);
               console.log(result.data);
             }).catch(err => {
                alert("Error with The Server " + err );
           });
           console.log(reload)
       },[reload] );

       

    return (
        <div>

{
 (flights.length > 0) ? 

    flights.map((oneElement) =>
    <div className="w-full flex justify-center">
    <Grid  item xs={4 } sx={{minWidth: "450px"}}>

    <Ticket
   reservationId = {oneElement._id} 
   passengerName = {user.username}
   departureFlight = {oneElement.departureFlight}
   departureSeats={oneElement.departureSeats}
   returnFlight ={oneElement.returnFlight}
   returnSeats ={oneElement.returnSeats}
   cabinClass ={oneElement.cabinClass}
   totalPrice = {oneElement.totalPrice}
   reload = { setReload }
   reload1 = { reload }
   />
    </Grid>
    </div>
 )
 : 
    <Typography variant="h3" sx={{width:"full" ,display: "flex" , justifyContent:"center" }}>
        You Have No Reservations Yet
    </Typography>
 
}

            
        </div>
    )
}

export default ReservedFlights
