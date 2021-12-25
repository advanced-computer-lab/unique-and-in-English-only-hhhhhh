import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { IconButton, Modal, Stack } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import Notification from './Notification'
import { AlertTitle } from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Redirect } from 'react-router';

const UserSearch = () => {
const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
const [firstVisit , setFirstVisit] = React.useState(false);
const [successfulSearch , setSuccessfulSearch] = React.useState(false);
const [Class, setClass] = React.useState('economic');
const [departureAirportTerminal, setDepartureAirportTerminal] = React.useState('');
const [arrivalAirportTerminal, setArrivalAirportTerminal] = React.useState('');
const [adultsCount, setAdultsCount] = React.useState(1);
const [childrenCount, setChildrenCount] = React.useState(0);
const [departureDate, setDepartureDate] = React.useState(new Date());
const [returnDate, setReturnDate] = React.useState(new Date());
const [flights , setFlights] = React.useState();
const [isGuest , setIsGuest] = React.useState(false);
const [noFlight , setNoFlight] = React.useState(false);

const handleChangeOfDeparture = (newValue) => {
  setDepartureDate(newValue);
  if ( newValue.getTime() > returnDate.getTime() ) {
    setReturnDate(newValue);
  }
};

const handleChangeOfReturn = (newValue) => {
 if (newValue <= departureDate) {
    setReturnDate(returnDate);
  }
  else{
    setReturnDate(newValue);
  }        
};

const handleSubmit = async (event) => {
  event.preventDefault();
  // rest of colleted Data and axios function
  setFirstVisit(true);
  if(departureAirportTerminal ==="" || arrivalAirportTerminal ===""){
    return;
  }
  const flight = {
    departureAirportTerminal: departureAirportTerminal,
    arrivalAirportTerminal: arrivalAirportTerminal,
    adults: adultsCount,
    children: childrenCount,
    class:Class,
    departureDate: departureDate,
    returnDate:returnDate
  }
  console.log(flight);
  if(localStorage.getItem("username")!=null){ 
    await axios.post('http://localhost:8000/user/readReservation' , flight)
        .then((result) => {
          console.log(result.data);
          setFlights(result.data);
          if(result.data.length==0)localStorage.setItem("noFlight",true);
          else localStorage.setItem("noFlight",false);
          console.log(localStorage.getItem("noFlight"));
          setSuccessfulSearch(true);
          setNotify({
            isOpen: true,
            message: 'Search Successfully',
            type: 'success'
        });
        }).catch(err => {
          
          setNotify({
            isOpen: true,
            message: 'Search Failed',
            type: 'error'
        })
      });
    }
    else{
      setNotify({
        isOpen: true,
        message: 'You need to login in first',
        type: 'warning'
    });
    window.setTimeout( () => {setIsGuest(true)}, 3000);
    }
};


    return (
      <>
      <div className=" border-b-4 border-blue-800 bg-white rounded-full w-11/12 ">
        <div className="flex  mt-32 rounded-xl ">
       
            <div className="justify-items-center p-10  rounded-xl flex">  
           
        <div className="flex items-stretch mx-3 pb-2 rounded-xl">
                <TextField
                  error = { (departureAirportTerminal === '') && firstVisit }
                  className="bg-white "
                  name="departureAirportTerminal"
                  required                 
                  id="departureAirportTerminal"
                  label="From"
                  placeholder="The Airport Name"
                  autoFocus
                  onChange = { e => {setDepartureAirportTerminal(e.target.value)} }
                />
                <TextField
                error = { (arrivalAirportTerminal === '') && firstVisit }
                className="bg-white"
                  required               
                  id="arrivalAirportTerminal"
                  label="To"
                  name="arrivalAirportTerminal"
                  placeholder="The Airport Name"
                  onChange = { e => {setArrivalAirportTerminal(e.target.value)} }
                />
      </div>

      <div className="flex justify-item-center justify-center item-center pb-2 mx-3">
                <TextField
                error = { (adultsCount === '') && firstVisit }
                inputProps= { {defaultValue:  adultsCount  } }
                className="bg-white "
                  name="adultsCount"
                  required                 
                  type="number"
                  id="adultsCount"
                  label="Adults Count"
                  placeholder="Number of Adults"
                  onInput={(event) =>{
                    if (event.target.value < 1){
                      event.target.value = 1
                    }
                    else if (event.target.value > 100){
                      event.target.value = 100
                    }
                    setAdultsCount(event.target.value)
                } 
              }
                />
                     <TextField
                     error = { (childrenCount === '') && firstVisit }
                     inputProps= { {defaultValue:  childrenCount  } }
                className="bg-white "
                  required                  
                  type="number"
                  id="childrenCount"                
                  label="Children Count"
                  name="childrenCount"
                  placeholder="Number of Children Count"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 500){
                      event.target.value = 500
                    }
                    setChildrenCount(event.target.value)
                }
              }
                />
             </div>   
             
             

<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="class">Class</InputLabel>
        <Select
        sx={{ width: 120 }}
        autoFocus
          labelId="class"
          id="class"
          value={Class}
          label="CLASS"
          onChange={ e => {setClass(e.target.value)} }
        >
          <MenuItem value={"economic"}>Economic</MenuItem>
          <MenuItem value={"business"}>Business</MenuItem>
        </Select>
      </FormControl>
    </Box>
                 
       <div className="flex bg-white justify-item-center mx-3  ">

      
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack  sx={{ width: 150 }} spacing={1}>
                <MobileDatePicker
                className="bg-white rounded-xl"
                     id = 'departureDate'
                     name = "departureDate"
                     label="Date Of Depature"
                     disablePast
                     value={ departureDate }
                     onChange={ handleChangeOfDeparture  }
                     renderInput={(params) => <TextField {...params} />}
                     
        />
        </Stack>
        </LocalizationProvider>
  
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack  sx={{ width: 150 }} spacing={1}>
                <MobileDatePicker
                     className="bg-white rounded-xl"
                     id = "returnDate"
                     name = "returnDate"
                     label="Date Of Return"
                     disablePast
                     value={returnDate}
                     onChange={ handleChangeOfReturn  }
                     renderInput={(params) => <TextField {...params} />}
                    />
                    </Stack>
                    </LocalizationProvider>
                    </div>
                    </div>


                


            

            
            </div>
             <div className="flex mx-auto w-1/4	 justify-end justify-item-center">
             <Button
               type="submit"
               fullWidth
               startIcon= {<TravelExploreIcon  />}
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
               onClick = { handleSubmit }
             >
               Search
             </Button>
            
             </div>
           </div>
           <Notification
                notify={notify}
                setNotify={setNotify}
            />
            { successfulSearch ?
            <Redirect
            to={{
            pathname: "/test5",
            state: { flights : flights ,departure: departureAirportTerminal , arrival:arrivalAirportTerminal  , Class: Class, maxNumber: ( parseInt(childrenCount) + parseInt(adultsCount) ),noFlight:noFlight }
          }}
        /> : <></>
            }
            { isGuest ?
            <Redirect
            to={{
            pathname: "/login",
          }}
        /> : <></>
            }

</>
 
    )
}

export default UserSearch
