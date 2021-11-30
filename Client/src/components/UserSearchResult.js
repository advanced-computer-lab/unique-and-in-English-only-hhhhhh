import Typography from '@mui/material/Typography';
import React from 'react'
import Showcase from './Showcase'
import UserSearchFlight from './UserSearchFlight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserSearchResult = (props) => {
    const [ choseDeparture , setChoseDeparture] = React.useState( true );
    const handleReservation1 = (clicked) => {
        setChoseDeparture(false);
        console.log( choseDeparture) ;
        console.log( clicked) ;

    };

    const handleReservation2 = (clicked) => {};

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
   ReserveAction={ (clicked) => handleReservation1(clicked) }
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
   ReserveAction={ (clicked) => handleReservation2(clicked) }
   />
    )
}

        </div>
    )
}

export default UserSearchResult
