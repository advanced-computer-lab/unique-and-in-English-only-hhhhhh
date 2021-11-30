import { Alert, Button, Typography } from "@mui/material";
import React from "react";
import Seat from "./Seat";



export default function SeatParent() {
  const [selected, setSelected] = React.useState([]);
  const [reachedMax , setReachedMax ] = React.useState( false );
  const handleSeatReservation = () => {
    if ( selected.length < 5 ){
        setReachedMax(true);
    }
    else {
        setReachedMax(false);
        // send the Selected Array to Backend that contained The Seat Id
    } 
  };
  return (
    <div className="w-1/2">
        <div className="w-full flex justify-center my-16">
      <Seat setSelected={setSelected} maxNumber="5" />
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
  );
}
