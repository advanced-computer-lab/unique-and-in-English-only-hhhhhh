import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Divider, Fade, Modal , Backdrop } from '@mui/material';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import SendIcon from '@mui/icons-material/Send';
import ConfirmDialog from './ConfirmDialog'
import Notification from './Notification'
import SeatParent from './SeatParent';
import axios from 'axios';
import { Box } from '@mui/system';
import EditLargeReservation from './EditReservations/EditLargeReservation'
import EditSmallReservation from './EditReservations/EditSmallReservation'
import CreditCard from './CreditCard/CreditCard'
import GeneralEditReservation from './EditReservations/GeneralEditReservation'
import { Typography , Button, Alert } from '@mui/material'


const UserFlightCard = (props) => {
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [ openSeats , setOpenSeats ]= React.useState(false);
    const [ openEditFlight , setOpenEditFlight ]= React.useState(false);
    const [selected , setSelected ]= React.useState(props.seats);
    const [chosenCabine , setChosenCabine ] = React.useState( props.cabinClass);
    const [ triggerEditSeats , setTriggerEditSeats ] = React.useState(false)
    const [ creditTrigger , setCreditTrigger] = React.useState(false);
    const [ cardNumber,setCardNumber] = React.useState("");
    const [ expMonth,setExpMonth] = React.useState("");
    const [ expYear,setExpYear] = React.useState("");
    const [ cvv,setCvv] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [severity,setSeverity] = React.useState("");
    const [error, setError] = React.useState(false);
    const [ alert , setAlert ] = React.useState( false );
    const [ isCompelet , setIsCompelet ] = React.useState( false );


    const style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "80%",
      maxHeight: 'calc(100vh - 100px)',
      height: "auto",
      bgcolor: '#fff',
      border: '2px solid #000',
      boxShadow: 24,
      p: 2,
      overflowY: 'auto',
    
    };

    React.useEffect( () => {
      // setSelected(props.seats.equals(selected) ? selected  );
      // setChosenCabine(props.cabinClass);
      console.log(selected);
    } , [selected] );

    const setConfirm = () =>{
      
    }

    const handleCancel = () =>{
        setConfirmDialog({
            isOpen: true,
            title: 'Are you Sure You Want To Cancel The Reservation?',
            subTitle: "You can't undo this operation",
            onConfirm: () => { cancelReservation() }
        })
    };
    const editReservation = async(arr) =>{
      if(cardNumber.length!=16 || expMonth == "" || expYear == "" || cvv.length!=3){
        setError(true);
        if(cvv.length!=3)setMessage("cvv must be 3 digits");
        if(expYear == "")setMessage("expiry year is required");
        if(expMonth == "")setMessage("expiry month is required");
        if(cardNumber.length!=16)setMessage("Card number must be 16 digits");
        setSeverity('error');
    }
    else{
      console.log("changed seats : " + selected);
      const update = {
        _id: props.reservationId ,
        update: {
            departureFlightId: "" ,
            departureSeats: props.type == "Departure Flight"? arr : "" ,
            cabinClass: "",
            returnFlightId: "",
            returnSeats: props.type == "Departure Flight"? "" : arr,
        }
    }

    await axios.post( 'http://localhost:8000/user/updateReservation' , update).then( res => {
      console.log(res);
      alert("reservation edited");
      props.reload("val");
      setAlert(true);
      setMessage("Successful Reservation update, You will be Redirected to the Home Page in 5 seconds!");
      setSeverity('success');
    }).catch( err => {
      //alert("reservation edited failed");
      setError(true);
      setMessage("error connecting to the server");
      setSeverity("error");
    });
  }

    //props.reload("val");
     

  };
  const sendEmail = async () =>{

    const reservation = {
      reservationId : props.reservationId 
    }
    await axios.post( 'http://localhost:8000/user/emailreservation' , reservation).then( res => {
      console.log(res);
      setNotify({
        isOpen: true,
        message: 'Email Sent ',
        type: 'success'
    });
    }).catch( err => {
      setNotify({
        isOpen: true,
        message: 'Error with Sending E-mail ',
        type: 'error'
    });
    });
};

const test2 = () => {
  setOpenEditFlight( true );
  setIsCompelet(false);
}
const handleClose = () =>{
setOpenEditFlight(false);
};

    const cancelReservation = async() => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        await axios.post('http://localhost:8000/user/deleteReservation', { _id : props.reservationId })
             .then(result => {
              setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'success'
            });
            props.reload("val");
             }).catch(err => {
              setNotify({
                isOpen: true,
                message: 'Failed To Delete',
                type: 'error'
            });
           });
    };

    const durationTime = () => {
      const diffTime = Math.abs( new Date((props.arrivalDate)) - new Date((props.departureDate)) );
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60  )); 
      return diffHours ;
    };

    return (
    <div >
        <Card sx={{  borderRadius: 10, minWidth: 550 ,maxWidth:650, maxHeight:600,  minHeight: 400 }} >
            <div className="h-36  bg-blue-900 border-b-4 border-green-900">
                <div className="flex justify-between ml-5 mb-5 pt-5"> 
                <div className="flex">
                <AirplaneTicketRoundedIcon sx={{color:"#ffff", height:30}} className="mr-3"/>
                <Typography sx={{color:"#ffffff"}} variant="h5" > 
                Zeyad Tayara
                </Typography>
                </div>
                <Typography sx={{marginRight:5 , color:"white"}} variant="body1">
                  {props.type}
                </Typography>
                </div>
            <div className="mb-2">
         <Divider variant="middle" />
         <Divider variant="middle" />
         </div>
         <div className="flex justify-between justify-items-center ml-3 mr-3">
         <Typography variant="h7" sx={{color:"#ffffff"}} > 
             Passenger Name: <br/>
               {props.passengerName}
         </Typography>
         <Typography variant="h7" sx={{color:"#ffffff"}} > 
         Departs: <br/>
         {(props.departureDate).substring(0, 10)}
         </Typography>
         <Typography variant="h7" sx={{color:"#ffffff"}}> 
         Arrives: <br/>
         {(props.arrivalDate).substring(0, 10)}
         </Typography>
         </div>
         </div>
        
          <CardContent>
              <div className=" flex justify-between justify-items-center">
                  <Typography  variant="h4">
                  {props.departureAirportTerminal}
            </Typography>
             <SendIcon sx={{fontSize:40}}/>             
            <Typography  variant="h4">
                  {props.arrivalAirportTerminal}
            </Typography>     
            </div>

            <div className=" flex justify-between justify-items-center mb-6">
            <Typography gutterBottom variant="caption" color="text.secondary">
            {(props.departureDate).substring(11, 16)}
            </Typography>
            <Typography gutterBottom variant="caption" color="text.secondary">
            {durationTime() + " Hours"}
            </Typography>
            <Typography gutterBottom variant="caption" color="text.secondary">
            {(props.arrivalDate).substring(11, 16)}
            </Typography>
            </div>

            <div className=" flex justify-between justify-items-center mb-3">
                  <div>
                  <Typography  variant="h6">
                        Flight
                    </Typography>
                 <Typography  variant="caption" color="text.secondary">
                 {props.flightNumber}
                    </Typography>
                  </div>

                  <div>
            <Typography  variant="h6">
              Seat
            </Typography>
            <Typography  variant="caption" color="text.secondary">
            {props.seats.toString()}
            </Typography>
            </div>
           
            <div>
            <Typography  variant="h6">
              Class
            </Typography>
            <Typography  variant="caption" color="text.secondary">
            {props.cabinClass}
            </Typography>
            </div>
            </div>
            <Typography  variant="caption" color="text.secondary">
          { (props.cabinClass === 'business')? "2*32KG" : "1*23KG" }
            </Typography>
          </CardContent>
          
          <CardActions className="flex justify-between mx-2 mb-2">
          
            
            <Button sx={{borderRadius: 5}} variant="contained" color="error" size="small" onClick={handleCancel}>Cancel Booking</Button>
            <Button sx={{borderRadius: 5}} variant="contained" color="info" size="small" onClick={ sendEmail }>Send Me E-Mail</Button>
            <Button sx={{borderRadius: 5}} variant="contained" color="success" size="small" onClick={ test2 }>Edit The Flight</Button>
          </CardActions>
        </Card>


        <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
         <Notification
                notify={notify}
                setNotify={setNotify}
            />

          {  openSeats? <SeatParent
        open={openSeats}
        maxNumber = { 100000 }
        close={ (boolean ) => {  setOpenSeats(boolean) } }
        toBeChanged = {selected}
        sendSeats = { setSelected }
        startEdit = { arr => {editReservation(arr)} } 
        flightNumber = { props._id }
        Class = { chosenCabine } 
        /> : <></>}

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        {...props}
        open={ openEditFlight }
        onClose= {handleClose}

        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
         <Fade in={openEditFlight}>
         <Box sx={style}>
           <GeneralEditReservation
           // for small reservation " Seats "
           seats = { props.seats }
           cabinClass = { props.cabinClass}
           type = { props.type }
           _id = { props._id }
           reservationId = { props.reservationId }

          // for Large reservation " Whole flight "
           reload = { (val) => props.reload(val)}
           openwind = { creditTrigger }
           reservationId = { props.reservationId }
           //_id = {props._id}
           departure = {props.departureAirportTerminal}
           return = {props.arrivalAirportTerminal}
           departureDate={props.travelDate}
           returnDate={props.returnDate}
           //cabinClass = {props.cabinClass}
           //type = {props.type}
           showCredit = {(boolean) => setCreditTrigger( boolean) }
           isComp = { (boolean) => {setIsCompelet(boolean)}}
           />
{
  creditTrigger ? 
 
              <CreditCard  
              setCardNumber={setCardNumber}
              setCvv={setCvv}
              setExpMonth={setExpMonth}
              setExpYear={setExpYear}
              /> : <></>
}
{
            alert || error? 
            <div className=" flex justify-center mt-5">
            <Alert sx severity={severity}>{message}</Alert>
            </div>
             :
        <></>
        }


         </Box>
    </Fade>
    </Modal>





        </div>
      );
}

export default UserFlightCard
