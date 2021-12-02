import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import SendIcon from '@mui/icons-material/Send';
import ConfirmDialog from './ConfirmDialog'
import Notification from './Notification'
import axios from 'axios';


const UserFlightCard = (props) => {
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });

    const handleCancel = () =>{
        setConfirmDialog({
            isOpen: true,
            title: 'Are you Sure You Want To Cancel The Reservation?',
            subTitle: "You can't undo this operation",
            onConfirm: () => { cancelReservation() }
        })
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
             }).catch(err => {
              setNotify({
                isOpen: true,
                message: 'Failed To Delete',
                type: 'error'
            });
           });
    };

    const durationTime = () => {
      const diffTime = Math.abs( new Date((props.arrivalDate)).getTime() - new Date((props.departureDate)).getTime() );
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60  * 24)); 
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
          </CardContent>
          
          <CardActions className="flex justify-between mr-2 mb-2">
          <Typography  variant="caption" color="text.secondary">
            Baggage: 1 * 23KG
            </Typography>
            <Button sx={{borderRadius: 5}} variant="contained" color="error" size="small" onClick={handleCancel}>Cancel Booking</Button>
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
        </div>
      );
}

export default UserFlightCard
