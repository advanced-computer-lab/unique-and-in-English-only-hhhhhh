import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import FlightCard from './FlightCard'
import SearchBox from './SearchBox'



const Combine = () => {
    var flag = true ;
    const [allState , setAllState] = React.useState([]);
    const [state , setState] = React.useState({
      flightNumber:'',
      ecoSeatsCount:'',
      businessSeatsCount:'',
      departureDate:  '',
      arrivalDate:  '',
      departureAirportTerminal:'',
      arrivalAirportTerminal:'',
      });

      
      useEffect(() => {
      if (flag) {
        axios.get('http://localhost:8000/admin/readFlight')
        .then((result) => {
          setAllState(result.data);
          console.log(allState);
        });
        flag = false ;
      }
    } , []);
     
    
      const handleEdit = async (newValue) => {
        setState(newValue);
         await axios.post('http://localhost:8000/admin/readFlight' , state)
        .then((result) => {
          setAllState(result.data);
          console.log(allState);
        });
      } 

    

    return (
        <div>
            <SearchBox Changedata={ (state) => handleEdit(state) }/>
            <Button onClick={e => {console.log(state)}} > click me</Button>

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
{ 
    allState.map((oneElement) =>
    <Grid item xs={4} sx={{minWidth: "450px"}}>
    <FlightCard  flightNumber={oneElement.flightNumber}
   departureDate ={new Date()}
   arrivalDate ={new Date()}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   />
    </Grid>


 )}




</Grid>
        </div>
    )
}

export default Combine
