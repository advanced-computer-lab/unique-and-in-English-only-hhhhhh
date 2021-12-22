import { Typography , Button, Alert } from '@mui/material'
import React from 'react'
import { Redirect } from 'react-router';
import ReservationSummary from './ReservationSummary'
import Notification from './Notification';
import CreditCard2 from './CreditCard2'
import axios from 'axios';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box, width } from '@mui/system';
import CreditCard from './CreditCard/CreditCard'
//import { Stripe } from 'stripe';
//const stripe = Stripe('sk_test_51K8BiHG054ddwxBHZyts7mX5bzlw7jhJKQeDsWxe8116DDafIdVwUVh3EZgL9LAIMe3xwN4BXTTrbpNYNYjttL7D00flyxYQBR')


const ReservationSummaryParent = (props) => {
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [ reDirect , setReDirect ] = React.useState( false );
    const [ alert , setAlert ] = React.useState( false );
    const [ checkoutURL,setcheckoutURL] = React.useState("/");
    const [ cardNumber,setCardNumber] = React.useState("");
    const [ expMonth,setExpMonth] = React.useState("");
    const [ expYear,setExpYear] = React.useState("");
    const [ cvv,setCvv] = React.useState("");
    const [error, setError] = React.useState(false);


    const Reservation = async ()=>{
        const body = {
            username:props.history.location.state.reservation.username,
            cabinClass:  props.history.location.state.reservation.cabinClass ,
            departureFlightId: props.history.location.state.reservation.departureFlightId,
            departureSeats: props.history.location.state.reservation.departureSeats,
            returnFlightId: props.history.location.state.reservation.returnFlightId,
            returnSeats: props.history.location.state.reservation.returnSeats,
            totalPrice: props.history.location.state.reservation.totalPrice
            };
         await axios.post('http://localhost:8000/user/checkout', body)
                   .then(result => {
                       setcheckoutURL(result.url);
                    setNotify({
                        isOpen: true,
                        message: 'Reservation Successfully',
                        type: 'success'
                    });
                     }).catch(err => {
                     alert("Error with The Server " + err );
                     });
                     setAlert(true);

            window.setTimeout( () => {setReDirect(true)}, 2000);
    };

    return (
        <div >

        <Typography sx={{ display: "flex",justifyContent: "center" , width: "100%" , marginY: "5px"}}  variant="h3"> OutBound Flight </Typography>
        <ReservationSummary
        _id = { props.history.location.state.departureFlight._id }
        flightNumber= {props.history.location.state.departureFlight.flightNumber}
        // ecoSeatsCount= {props.history.location.state.departureFlight.ecoSeatsCount}
         economicSeatPrice= {props.history.location.state.departureFlight.economicSeatPrice}
        // businessSeatsCount= {props.history.location.state.departureFlight.businessSeatsCount}
         businessSeatPrice= {props.history.location.state.departureFlight.businessSeatPrice}
        departureDate= {props.history.location.state.departureFlight.departureDate}
        arrivalDate= {props.history.location.state.departureFlight.arrivalDate}
        departureAirportTerminal= {props.history.location.state.departureFlight.departureAirportTerminal}
        arrivalAirportTerminal= {props.history.location.state.departureFlight.arrivalAirportTerminal}
        seats = {props.history.location.state.reservation.departureSeats}
        cabinClass = {props.history.location.state.reservation.cabinClass}
        totalPrice = {props.history.location.state.reservation.totalPrice}
        seatsCount = { props.history.location.state.reservation.departureSeats.length}
        type = "Departure Flight"
        passengerName = 'Konar'
        />
        <Typography sx={{ display: "flex",justifyContent: "center" , width: "100%" , marginY: "5px"}} variant="h3"> Return Flight </Typography>
        <ReservationSummary
        _id = { props.history.location.state.returnFlight._id }
        flightNumber= {props.history.location.state.returnFlight.flightNumber}
        // ecoSeatsCount= {props.history.location.state.returnFlight.ecoSeatsCount}
         economicSeatPrice= {props.history.location.state.returnFlight.economicSeatPrice}
        // businessSeatsCount= {props.history.location.state.returnFlight.businessSeatsCount}
         businessSeatPrice= {props.history.location.state.returnFlight.businessSeatPrice}
        departureDate= {props.history.location.state.returnFlight.departureDate}
        arrivalDate= {props.history.location.state.returnFlight.arrivalDate}
        departureAirportTerminal= {props.history.location.state.returnFlight.departureAirportTerminal}
        arrivalAirportTerminal= {props.history.location.state.returnFlight.arrivalAirportTerminal}
        seats = {props.history.location.state.reservation.departureSeats}
        cabinClass = {props.history.location.state.reservation.cabinClass}
        totalPrice = {props.history.location.state.reservation.totalPrice}
        seatsCount = { props.history.location.state.reservation.returnSeats.length}
        type = "Return Flight"
        passengerName = 'Konar'
        />
         <Typography sx={{ display: "flex",justifyContent: "center" , width: "100%" , marginY: "5px" , color:"black"}}  variant="h3">
              Total Price: { props.history.location.state.reservation.totalPrice } EGP </Typography>

{
            alert ? 
            <div className=" flex justify-center mt-5">
            <Alert sx severity="success">Successful Reservation, You will be Redirected to the Home Page in 5 seconds!</Alert>
            </div>
             :
        <></>
        }

 <div className="flex justify-center mt-5  ">
    
            <div className="flex justify-center w-3/6 bg-blue-100 pb-16 pl-16 rounded-full">
                <CreditCard  
                setCardNumber={setCardNumber}
                setCvv={setCvv}
                setExpMonth={setExpMonth}
                setExpYear={setExpYear}
                />
            
            </div>
    </div> 





        <div className=" flex justify-center mt-5 ">
            <Button color="error" variant="contained" sx={{ marginX : "20px"}}  onClick={()=> {setReDirect(true)}}>
                Cancel The Reservation
            </Button>
            <Button color="success" variant="contained" sx={{ marginX : "20px"}} onClick={()=> {Reservation();}}>
                Confirm The Reservation
            </Button>
        </div>

        {/* {
            reDirect ? 
            <Redirect
            to={{
            pathname: checkoutURL,
          }}
        /> :
        <></>
        } */}



<Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default ReservationSummaryParent
