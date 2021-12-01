import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import Showcase from './Showcase'
import UserSearchFlight from './UserSearchFlight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SeatParent from './SeatParent';



const UserSearchResult = (props) => {
    const [ choseDeparture , setChoseDeparture] = React.useState( true );
    const [stage , setStage ] = React.useState( 0 );
    const [trigger_seat_1 , setTrigger_seat_1] = React.useState( false );
    const [trigger_seat_2 , setTrigger_seat_2] = React.useState( false );
    const [departureId,setDepartureId] = useState('');
    const [ returnId , setReturnId] = useState('');
    const [ departureSeats , setDepartureSeats] = React.useState([]);
    const [ returnSeats , setReturnSeats] = React.useState([]);
    






    const handleReservation = (id) => {

            setDepartureId(id);
            setTrigger_seat_1( true );
            console.log(departureId);

    };

    React.useEffect(() => {
        console.log(props.history.location.state);
      } , [] );

    return (
        <div>
            <Showcase />
            <div className="mt-16"/>

            { choseDeparture ?
             <div className="w-full flex justify-center  mb-8 text-opacity-25">
                    <Typography sx={{opacity: 0.7}}  variant="h3">Departure Flights </Typography>
             </div>
              :
             <div className="w-full flex justify-between justify-items-start mb-8 text-opacity-25">
                    <ArrowBackIcon sx={{fontSize: 50, opacity: 0.7}} onClick={() => setChoseDeparture(true)}/>
                    <Typography sx={{opacity: 0.7}}  variant="h3">Return Flights </Typography>
                    <div/>
             </div>
            }

{ choseDeparture ? 
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
   ReserveAction={ (id) => handleReservation(id) }
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
   ReserveAction={ (id) => handleReservation(id) }
   />
    )
}

       


        </div>
    )
}

export default UserSearchResult
