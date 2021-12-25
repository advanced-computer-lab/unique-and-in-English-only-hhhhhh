import React from 'react'
import { Button, InputLabel, MenuItem, Radio, RadioGroup , Select, Typography , TextField , Alert} from '@mui/material'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EditSmallReservation from '../EditReservations/EditSmallReservation'
import EditLargeReservation from '../EditReservations/EditLargeReservation'
import EditCabin from '../EditReservations/EditCabin'
import CreditCard from '../CreditCard/CreditCard'

import { Box } from '@mui/system'

const GeneralEditReservation = (props) => {
    const [ desiredEdit , setDesiredEdit ] = React.useState( 1 );
    const [ openSeats , setOpenSeats ] = React.useState( props.openwind );
    const [ creditTrigger , setCreditTrigger ] = React.useState(false);
    const [ cardNumber,setCardNumber] = React.useState("");
    const [ expMonth,setExpMonth] = React.useState("");
    const [ expYear,setExpYear] = React.useState("");
    const [ cvv,setCvv] = React.useState("");
    const [ isCompelet , setIsCompelet ] = React.useState( false );
    const [ update , setUpdate ] = React.useState();
    const [message, setMessage] = React.useState("");
    const [severity,setSeverity] = React.useState("");
    const [error, setError] = React.useState(false);
    const [ alert2 , setAlert2 ] = React.useState( false );
    const [ diff , setDiff ] = React.useState('');
    const [ credit , setCredit ] = React.useState(false);

    const pay = async() => {
      if(cardNumber.length!=16 || expMonth == "" || expYear == "" || cvv.length!=3){
        setError(true);
        if(cvv.length!=3)setMessage("cvv must be 3 digits");
        if(expYear == "")setMessage("expiry year is required");
        if(expMonth == "")setMessage("expiry month is required");
        if(cardNumber.length!=16)setMessage("Card number must be 16 digits");
        setSeverity('error');
    }
    else{
    await axios.post( 'http://localhost:8000/user/updateReservation' , update).then( res => {
      console.log(res);
      alert("reservation edited");
      props.reload("val");
      setAlert2(true);
      setMessage("Successful Reservation update !");
      setSeverity('success');
    }).catch( err => {
        console.log( "failed ")
      alert("reservation edited failed");
      setError(true);
      setMessage("error connecting to the server");
      setSeverity("error");
    });
  } 
    }

    React.useEffect( async() => {
      if ( isCompelet ){
        editReservation();
      }

if ( diff != ''){
  if ( diff > 0 ){
        setCredit(true);
        }
        else{
          await axios.post( 'http://localhost:8000/user/updateReservation' , update).then( res => {
          console.log(res);
          props.reload("val");
          setAlert2(true);
          setMessage("Successful Reservation update !");
          setSeverity('success');
        }).catch( err => {
            console.log( "failed ")
          
          setError(true);
          setMessage("error connecting to the server");
          setSeverity("error");
        });
        }
}
      
    } , [isCompelet , diff])
    const editReservation = async() =>{
          console.log( update );
          await axios.post( 'http://localhost:8000/user/getUpdateDiff' , update).then( res => {
            console.log(res.data.difference);
            setDiff(res.data.difference);
            alert("I have Diff");
          }).catch( err => {
            alert("I failed to have Diff");
          });
          


           
        
        
        };
    React.useEffect( () => {
        setOpenSeats( props.openwind );
    } , [props.openwind]);
    return (
        <div>
            <div className='justify-center my-12 w-full'>
                
<div>
    {
  isCompelet ? 
 <>
              {credit ? <div className='mr-16'>
              <CreditCard  
              setCardNumber={setCardNumber}
              setCvv={setCvv}
              setExpMonth={setExpMonth}
              setExpYear={setExpYear}
              /> 
              </div> : <></>}
              {
            alert || error? 
            <div className=" flex justify-center mt-5">
            <Alert sx severity={severity}>{message}</Alert>
            </div>
             :
        <></>
        }
              {credit ? <div className='flex justify-center my-16 mr-16'>
                <Button 
                variant="contained"
                disabled = { alert2 }
                color="success"
                sx={{ marginX: 3}} 
                onClick={ pay }>
                    Confirm The Edit
                </Button>
            </div> : <></> }
              </>: <div className='my-16 flex justify-center w-full'>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="class">Choose What To Be Edited</InputLabel>
        <Select
        sx={{ width: 120 }}
        autoFocus
          labelId="class"
          id="class"
          value={desiredEdit}
          label="Choose What To Be Edited"
          onChange={ e => {setDesiredEdit(e.target.value); console.log(desiredEdit)} }
        >
          <MenuItem value={1}>Edit The Seat</MenuItem>
          <MenuItem value={2}>Edit The Cabin</MenuItem>
          <MenuItem value={3}>Edit The Flight</MenuItem>
        </Select>
      </FormControl>
    </Box>
</div>
}
</div>
            </div>

{
   !isCompelet ?  desiredEdit == 1 ? <EditSmallReservation
    seats = { props.seats }
    cabinClass = { props.cabinClass}
    type = { props.type }
    _id = { props._id }
    reservationId = { props.reservationId }
    //reload = { (val) => props.reload(val)}
    openwind = { true }
    isComp = { (boolean) => setIsCompelet(boolean) }
    theUpdate = { setUpdate }
/>
    : desiredEdit == 2?
    <EditCabin
    seats = { props.seats }
    cabinClass = { props.cabinClass}
    type = { props.type }
    _id = { props._id }
    reservationId = { props.reservationId }
    isComp = { (boolean) => setIsCompelet(boolean) }
    theUpdate = { (value) => setUpdate(value) }
    /> :
    
    <EditLargeReservation
    reservationId = { props.reservationId }
    _id = {props._id}
    departure = {props.departure}
    return = {props.return}
    departureDate={props.departureDate}
    returnDate={props.returnDate}
    cabinClass = {props.cabinClass}
    type = {props.type}
    showCredit = {(boolean) => setCreditTrigger( boolean) }
   // reload = { (val) => props.reload(val)}
    isComp = { (boolean) => setIsCompelet(boolean) }
    theUpdate = { setUpdate }
     />

     : 
     <></>
}



        </div>
    )
}

export default GeneralEditReservation
