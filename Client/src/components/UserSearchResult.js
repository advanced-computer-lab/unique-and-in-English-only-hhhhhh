import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Showcase from './Showcase'
import UserSearchFlight from './UserSearchFlight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SeatParent from './SeatParent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import { Redirect } from 'react-router';
import Progress_Bar from'./ProgressBar/Progress_Bar'




// const UserSearchResult = (props)
// class PageComponent extends React.Component
const UserSearchResult = (props) => {
    const [ foundTheFlight , setFoundTheFlight] = React.useState(false);
    const [ choseDeparture , setChoseDeparture] = React.useState( false );
    const [departureId,setDepartureId] = useState('');
    const [ returnId , setReturnId] = useState('');
    const [ departureSeats , setDepartureSeats] = React.useState('');
    const [ returnSeats , setReturnSeats] = React.useState('');
    const [ departurePrice , setDeparturePrice] = React.useState(0);
    const [ returnPrice , setReturnPrice] = React.useState(0);
    const [body , setBody] = React.useState();
    const [ departureFlight , setDepartureFlight ] = React.useState();
    const [ returnFlight , setReturnFlight ] = React.useState();
    const [ percent,setPercent] = React.useState(0);

           
    React.useEffect(() => {
        setFoundTheFlight(false);
        setChoseDeparture(false);
        setDepartureId('');
        setReturnId('');
        setDepartureSeats('');
        setReturnSeats('');
        setDeparturePrice(0);
        setReturnPrice(0);
        setBody();
        setDepartureFlight();
        setReturnFlight();
      } , [ props.history.location.state.flights , props.history.location.state.Class ,  props.history.location.state.maxNumber ] );

    const sendTheReservation = async() => {
        setBody({
            username:"konar",
            cabinClass:  props.history.location.state.Class ,
            departureFlightId: departureId,
            departureSeats: departureSeats.split(','),
            returnFlightId: returnId,
            returnSeats: returnSeats.split(','),
            totalPrice: (departurePrice + returnPrice ) * parseInt(props.history.location.state.maxNumber)
            });
            const departueF = {
                _id : departureId
            }
            const returnF = {
                _id : returnId
            }
            await axios.post('http://localhost:8000/user/readFlightById', departueF)
                   .then(result => {
                     setDepartureFlight(result.data);
                     }).catch(err => {
                     alert("Departure Successfully didn't Fetch " + err );
                     });
            await axios.post('http://localhost:8000/user/readFlightById', returnF)
                   .then(result => {
                     setReturnFlight(result.data);
                     }).catch(err => {
                     alert("Return Successfully didn't Fetch " + err );
                     });            
                     setFoundTheFlight(true);
                };     
    

   

    return (
        <div>
            <Showcase />

            <div className= " w-full flex justify-center ml-3 mt-8">
                <div />
            <Button variant="contained" startIcon={<ArrowForwardIcon/>} color="primary" onClick={() => sendTheReservation() } disabled={ (departureSeats ==='') || (returnSeats==='') }>
                Proceed To Reservation Summary
            </Button>
            <div />
            </div>

            <div className="mt-16"/>

            { !choseDeparture ?
             <div className="w-full flex justify-between justify-items-end  mb-8 text-opacity-25">
                    <div/>
                    <Typography sx={{opacity: 0.7}}  variant="h3">Departure Flights  </Typography>
                    <IconButton color="primary" onClick={() => {setChoseDeparture(true); setPercent(34);}} disabled= { (departureSeats === '') }>
                    <ArrowForwardIcon sx={{fontSize: 50, opacity: 0.7}} />
                    </IconButton>

                   

             </div>
              :
             <div className="w-full flex justify-between justify-items-start mb-8 text-opacity-25">
                    <IconButton color="primary" onClick={() => {setChoseDeparture(false); setPercent(0);}} disabled= { false  }>
                    <ArrowBackIcon sx={{fontSize: 50, opacity: 0.7}} />  
                    </IconButton>
                    
                    <Typography sx={{opacity: 0.7}}  variant="h3">Return Flights </Typography>
                    <div/>
             </div>
            }

<div className='my-16 ml-40'>
    <Progress_Bar percent={percent}/>
</div>

{ !choseDeparture ? 
    (props.history.location.state.flights.departureFlights).map((oneElement) =>
    <UserSearchFlight
   _id = {oneElement._id}
   flightNumber={oneElement.flightNumber}
   departureDate ={oneElement.departureDate}
   arrivalDate ={oneElement.arrivalDate}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   ecoSeatsCount = {oneElement.ecoSeatsCount}
   businessSeatsCount=  {oneElement.businessSeatsCount}
   economicSeatPrice= { oneElement.economicSeatPrice}
   businessSeatPrice= { oneElement.businessSeatPrice}
   Class = {props.history.location.state.Class} 
   maxNumber = {props.history.location.state.maxNumber}
   setId = { setDepartureId }
   setSeats = { setDepartureSeats }
   setPrice = { setDeparturePrice }
   />
    )
    :
    (props.history.location.state.flights.returnFlights).map((oneElement) =>
    <UserSearchFlight
   _id = {oneElement._id}
   flightNumber={oneElement.flightNumber}
   departureDate ={oneElement.departureDate}
   arrivalDate ={oneElement.arrivalDate}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   ecoSeatsCount = {oneElement.ecoSeatsCount}
   businessSeatsCount=  {oneElement.businessSeatsCount}
   economicSeatPrice= { oneElement.economicSeatPrice}
   businessSeatPrice= { oneElement.businessSeatPrice}
   Class = {props.history.location.state.Class} 
   maxNumber = {props.history.location.state.maxNumber}
   setId = { setReturnId }
   setSeats = { setReturnSeats }
   setPrice = { setReturnPrice }
   />
    )
}

{ foundTheFlight ?
            <Redirect
            to={{
            pathname: "/test1",
            state: { reservation  : body , departureFlight: departureFlight , returnFlight:  returnFlight  }
          }}
        /> : <></>
            }


        </div>
    )
}

export default UserSearchResult
