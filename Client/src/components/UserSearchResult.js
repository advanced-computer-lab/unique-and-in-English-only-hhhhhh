import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Showcase from './Showcase'
import UserSearchFlight from './UserSearchFlight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SeatParent from './SeatParent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';





const UserSearchResult = (props) => {
    const [ choseDeparture , setChoseDeparture] = React.useState( false );
    const [departureId,setDepartureId] = useState('');
    const [ returnId , setReturnId] = useState('');
    const [ departureSeats , setDepartureSeats] = React.useState('');
    const [ returnSeats , setReturnSeats] = React.useState('');
    const [ departurePrice , setDeparturePrice] = React.useState(0);
    const [ returnPrice , setReturnPrice] = React.useState(0);
    const [stage , setStage] = React.useState(0);
    

    






    const handleReservation = (id , selected , price ) => {
        if ( departureSeats === '' || stage == 0  ){
            console.log(selected);
            setDepartureId(id);
            setDepartureSeats( selected );
            setDeparturePrice( parseInt(price) );
            console.log(departureSeats);
        }
        else  {
            if ( returnSeats === '' || stage == 1  ){
                setReturnId(id);
                setReturnSeats( selected );
                setReturnPrice( parseInt(price) );
                }
    }
};

    const sendTheReservation = async() => {
        const body = {
            username:"konar",
            cabinClass:  props.history.location.state.Class ,
            departureFlightId: departureId,
            departureSeats: departureSeats.split(','),
            returnFlightId: returnId,
            returnSeats: returnSeats.split(','),
            totalPrice: (departurePrice + returnPrice ) * parseInt(props.history.location.state.maxNumber)
            };
            console.log(body);
            await axios.post('http://localhost:8000/user/reserve', body)
                   .then(result => {
                     alert("Reservation Successfully " );
                     }).catch(err => {
                     alert("Error with The Server " + err );
                     });
                }     
    

    // React.useEffect(() => {
    //     if ( departureSeats !== '' ){
    //            setChoseDeparture(true);
    //     }
         
    //   } , [departureSeats] );

    return (
        <div>
            <Showcase />
            <div className="mt-16"/>

            { !choseDeparture ?
             <div className="w-full flex justify-between justify-items-end  mb-8 text-opacity-25">
                    <div/>
                    <Typography sx={{opacity: 0.7}}  variant="h3">Departure Flights </Typography>
                    <IconButton color="primary" onClick={() => {setChoseDeparture(true); setStage(1);}} disabled= { (departureSeats === '') }>
                    <ArrowForwardIcon sx={{fontSize: 50, opacity: 0.7}} />
                    </IconButton>

                   

             </div>
              :
             <div className="w-full flex justify-between justify-items-start mb-8 text-opacity-25">
                    <IconButton color="primary" onClick={() => {setChoseDeparture(false); setStage(0);}} disabled= { false  }>
                    <ArrowBackIcon sx={{fontSize: 50, opacity: 0.7}} />  
                    </IconButton>
                    
                    <Typography sx={{opacity: 0.7}}  variant="h3">Return Flights </Typography>
                    <div/>
             </div>
            }

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
   ReserveAction={ (id , selected , price ) => handleReservation( id , selected , price ) }
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
   ReserveAction={ (id , selected , price ) => handleReservation( id , selected , price) }
   />
    )
}
            <div className="flex justify-center mt-5">
                <IconButton color="primary" onClick={() => sendTheReservation() } disabled={ (departureSeats ==='') || (returnSeats==='') }>
                    <ArrowForwardIcon sx={{fontSize: 50, opacity: 0.7}} />  
                    </IconButton>
                    </div>
       


        </div>
    )
}

export default UserSearchResult
