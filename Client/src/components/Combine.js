import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import FlightCard from './FlightCard'
import SearchBox from './SearchBox'


const Combine = () => {
    const [allState , setAllState] = React.useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
      .then((result) => {
        setAllState(result.data);
        console.log(allState);
      });

      },[]);
    return (
        <div>
            <SearchBox></SearchBox>

            <Grid 
       container
       display="flex"
       alignContent="center"
       alignItems="center"
       justifyContent = "center"
       wrap="wrap"
       padding= "120px"
       paddingLeft= "200px"
       spacing={15}
>
{ allState.map((oneElement) =>


    <Grid item xs={4} sx={{minWidth: "450px"}}>
    <FlightCard  flightNumber={oneElement.name}
   departureDate ={new Date()}
   arrivalDate ={new Date()}
   departureAirportTerminal ={oneElement.username}
   arrivalAirportTerminal = {oneElement.email}
   />
    </Grid>


 )}




</Grid>
        </div>
    )
}

export default Combine
