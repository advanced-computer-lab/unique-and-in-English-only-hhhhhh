import { SearchSharp } from "@material-ui/icons";
import { Alert, Button, Typography, Modal , Fade, Backdrop } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import Notification from "./Notification";
import Seat from "./Seat";

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
  p: 4,
  overflowY: 'auto',

};


// props is flight_id and class Flight
  const SeatParent = (props) => {
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [ reRun , setReRun ] = React.useState(true);
  const [selected, setSelected] = React.useState( props.toBeChanged==null ? [] : props.toBeChanged.map((item) => {item = parseInt(item); return item;}) )
  const [reachedMax , setReachedMax ] = React.useState( false );
  const [seats , setSeats] = React.useState([]);
  const [index , setIndex ] = React.useState(0);
  const[ reachedSeats , setReachedSeats] = React.useState( false );

  React.useEffect( async() => {
   const flight = {
    _id : props.flightNumber ,
    reservedSeats :selected , 
   };
   console.log(flight._id);
   console.log(props.toBeChanged);
    await axios.post('http://localhost:8000/user/readFlightSeats', flight)
        .then(result => {
          setSeats(result.data.flightSeats);
          setIndex(result.data.index)
          console.log(result.data.flightSeats);
          setReachedSeats(true);
        }).catch(err => {
           setNotify({
            isOpen: true,
            message: 'Failed to Retrieve The Seats',
            type: 'error'
        });
      });
      console.log(seats);
      
    
    console.log("reRun");
  } , [ reRun , selected , reachedMax , props.flightNumber ]   );

  // const checkAndEdit = () => {
  //    setSeats( seats.map((row) => {
  //     if ( row.length != 0)
  //     row.map( (seat) => {
  //       if (seat != null){ 
  //       if ( props.toBeChanged.includes(seat["id"] + "" || seat["id"]) ){
  //         console.log(seat);
  //         seat["isReserved"] = false;
  //         seat["isSelected"] = true;
  //       }
  //     }
  //     return seat ;
  //     });
  //     return row ;
  //   })
  //    )
  //    console.log(seats);
  // };

// , [ reRun , selected , reachedMax ] 
  const handleSeatReservation = () => {
    if ( selected.length < props.maxNumber && props.toBeChanged == null ){
        setReachedMax(true);
    }
    else {
      setNotify({
        isOpen: true,
        message: 'You Have Chosen The Seats',
        type: 'success'
    });
        props.sendSeats( selected.toString() );        
        setIndex(0);
        setSelected([]);
        setReRun( !reRun);
        setReachedMax(false);
        props.close(false );
        
    }
  };


  // ( props.Class === 'business' )? seats.slice(0,index) : seats.slice(index+1 , seats.length)
  return (
    <>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        {...props}
        onClose= { ()=> {
          setIndex(0);
          setSelected([]);
          setReRun( !reRun);
          setReachedMax(false);
          props.close(false );
           }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
         <Fade in={props.open}>
         <Box sx={style}>
    <div className="w-1/2">
        <div className="w-full flex justify-center my-16">
          {
            reachedSeats?
            <Seat setSelected={setSelected} maxNumber={props.maxNumber}
      seat={  (props.Class=='economic')?  seats.slice(index , seats.length) : seats.slice(0,index) }
/>
: <></>
          }
    
        </div>
      <div className="">
        <div className="w-full flex justify-center"> 
        { reachedMax ? <Alert severity="error">You Haven't Chosen All The Seats!</Alert> : <></>}
        </div>
        <div className="w-full flex justify-center mt-3">
        <Button variant="contained" onClick={handleSeatReservation}> Continue </Button>
        </div>
      </div>
    </div>
    </Box>
    </Fade>
    </Modal>
    <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </>
  );
}

export default SeatParent

