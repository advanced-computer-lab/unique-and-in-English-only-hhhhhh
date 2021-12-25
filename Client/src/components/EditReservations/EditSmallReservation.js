import axios from 'axios';
import React from 'react'
import SeatParent from '../SeatParent';
import GeneralSeats from '../Seats/GeneralSeats'

const EditSmallReservation = (props) => {
    const [ openSeats , setOpenSeats ]= React.useState( props.openwind );
    const [selected , setSelected ]= React.useState(props.seats);
    const [chosenCabine , setChosenCabine ] = React.useState( props.cabinClass);
    const [ openEditFlight , setOpenEditFlight ]= React.useState(false);
    const [message, setMessage] = React.useState("");
    const [severity,setSeverity] = React.useState("");
    const [error, setError] = React.useState(false);
    const [ alert2 , setAlert2 ] = React.useState( false );
    React.useEffect( () => {
        setOpenSeats( props.openwind );
        setChosenCabine(props.cabinClass);
        console.log(chosenCabine);
        setSelected(props.seats);
    } , [props.openwind , props.cabinClass , props.seats]);
    
    const handleClose = () =>{
        setOpenEditFlight(false);
        };
    const editReservation = async(arr) =>{
    //     if(cardNumber.length!=16 || expMonth == "" || expYear == "" || cvv.length!=3){
    //       setError(true);
    //       if(cvv.length!=3)setMessage("cvv must be 3 digits");
    //       if(expYear == "")setMessage("expiry year is required");
    //       if(expMonth == "")setMessage("expiry month is required");
    //       if(cardNumber.length!=16)setMessage("Card number must be 16 digits");
    //       setSeverity('error');
    //   }
    //   else{
        console.log("changed seats : " + arr);
        console.log( "the type : " + props.type);
        const update = {
          _id: props.reservationId ,
          update: {
              departureFlightId: "" ,
              departureSeats: props.type == "Departure Flight"? arr : "" ,
              cabinClass: props.cabinClass,
              returnFlightId: "",
              returnSeats: props.type == "Departure Flight"? "" : arr,
          }
      }
      console.log( update);
      props.theUpdate(update);
      props.isComp(true);
   // }       
    };
    return (
        <div>
            {  openSeats? <GeneralSeats
        open={openSeats}
        maxNumber = { 100000 }
        close={ (boolean ) => {  setOpenSeats(boolean) } }
        toBeChanged = {selected}
        sendSeats = { setSelected }
        startEdit = { arr => {editReservation(arr)} } 
        flightNumber = { props._id }
        Class = { chosenCabine } 
        /> : <></>}
        </div>
    )
}

export default EditSmallReservation
