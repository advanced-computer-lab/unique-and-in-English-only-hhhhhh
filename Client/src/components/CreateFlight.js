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
import { IconButton, Modal } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import axios from 'axios';
import { Alert } from '@mui/material';
import Notification from './Notification'
import { AlertTitle } from '@mui/material';

 

const CreateFlight = () => {
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [checked, setChecked] = React.useState(true);
    const [flag , setFlag] = React.useState(true);
    const [ createdFlag , setCreatedFlag ]= React.useState(false);
    const [ createdFailed , setCreatedFailed ]= React.useState(false);

    const [ flightNumber , setFlightNumber ]= React.useState("");
    const [ ecoSeatsCount , setEcoSeatsCount ]= React.useState("");
    const [ businessSeatsCount , setBusinessSeatsCount ]= React.useState("");
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [arrivalDate, setarrivalDate] = React.useState(new Date());
    const [ departureAirportTerminal , setDepartureAirportTerminal ]= React.useState("");
    const [ arrivalAirportTerminal , setArrivalAirportTerminal ]= React.useState("");
    const [ economicSeatPrice , setEconomicSeatPrice ]= React.useState("");
    const [ businessSeatPrice , setBusinessSeatPrice ]= React.useState("");
          

    const setFlags = ()=> {
      setCreatedFlag(false);
      setCreatedFailed(false);
    };

    const clickOnTheIcon = () => {
      setChecked((prev) => !prev);
      setFlags();
    };

    const handleChangeOfDeparture = (newValue) => {
      setDepartureDate(newValue);
      if ( newValue.getTime() > arrivalDate.getTime() ) {
        setarrivalDate(newValue);
      }
      setFlags();
    };

    const handleChangeOfArrival = (newValue) => {
      setFlags();
     if (newValue.getTime() <= departureDate.getTime()) {
        setarrivalDate(arrivalDate);
      }
      else{
        setarrivalDate(newValue);
      }        
    };

    
      
    const handleSubmit = async (event) => {
      event.preventDefault();
      setFlags();
      var empty = false ;

      const flight = {
      flightNumber: flightNumber,
      ecoSeatsCount:(ecoSeatsCount!="") ?ecoSeatsCount : 0,
      businessSeatsCount:(businessSeatsCount!="") ?businessSeatsCount : 0,
      departureDate:departureDate,
      arrivalDate:arrivalDate,
      departureAirportTerminal:departureAirportTerminal,
      arrivalAirportTerminal:arrivalAirportTerminal,
      economicSeatPrice: economicSeatPrice,
      businessSeatPrice: businessSeatPrice
      }

      if ( economicSeatPrice==""||businessSeatPrice==""|| flightNumber == "" || departureDate == "" || arrivalDate == "" || departureAirportTerminal == "" || arrivalAirportTerminal == ""){
        empty = true
      }

    
     if(!empty){
      await axios.post('http://localhost:8000/admin/createFlight' , flight )
      .then(res => {
        console.log(res.data);
        setCreatedFlag(true);
        setNotify({
          isOpen: true,
          message: 'Flight Created Successfully',
          type: 'success'
      })
      }).catch(err => {
        setNotify({
          isOpen: true,
          message: 'Error with The SERVER',
          type: 'error'
      });
      setCreatedFailed(true);
    });
  }
  else{
    alert("Some Empty Fields");
  }
  
    };
   
    return (
      <div>
                    <Notification
            notify={notify}
            setNotify={setNotify}
                      />
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 15
          }}
        >
          <IconButton onClick={clickOnTheIcon}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <NoteAddIcon  />
          </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            Create New Flight!
          </Typography>

          <Collapse in={checked}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="flightNumber"
                  label="Flight Number"
                  name="flightNumber"
                  placeholder="EX. PI 150"
                  inputProps={{ maxLength: 7 }}
                  onChange = { (e) => {setFlightNumber(e.target.value)}   }
                  autoFocus
                />
              </Grid>
              
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="departureAirportTerminal"
                  
                  required
                  fullWidth
                  id="departureAirportTerminal"
                  label="From"
                  placeholder="The Airport Name"
                  autoFocus
                  onChange = {(e) => {setDepartureAirportTerminal(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  
                  id="arrivalAirportTerminal"
                  label="To"
                  name="arrivalAirportTerminal"
                  placeholder="The Airport Name"
                  onChange = { (e) => {setArrivalAirportTerminal(e.target.value)} }
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="businessSeatsCount"
                  
                  required
                  fullWidth
                  type="number"
                  id="businessSeatsCount"
                  label="Business Seats"
                  placeholder="Number of Seats"
                  onInput={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 100){
                      event.target.value = 100
                    }
                    setBusinessSeatsCount(event.target.value);
                } 
              }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="ecoSeatsCount"
                 
                  label="Economic Seats"
                  name="ecoSeatsCount"
                  placeholder="Number of Seats"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 500){
                      event.target.value = 500
                    }
                    setEcoSeatsCount(event.target.value);
                }
              }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type= "number"
                  id="businessSeatPrice"
                  label="Business Seat Price"
                  name="businessSeatPrice"
                  placeholder="Business Seat Price"
                  onChange = { (e) => {setBusinessSeatPrice(e.target.value)}   }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type= "number"
                  id="economicSeatPrice"
                  label="Economic Seat Price"
                  name="economicSeatPrice"
                  placeholder="Economic Seat Price"
                  onChange = { (e) => {setEconomicSeatPrice(e.target.value)}   }
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                     id = 'departureDate'
                     name = "departureDate"
                     label="Date&Time of Depature"
                     disablePast
                     value={departureDate}
                     onChange={ handleChangeOfDeparture  }
                     renderInput={(params) => <TextField {...params} />}
                     
        />
        </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                     id = "arrivalDate"
                     name = "arrivalDate"
                     label="Date&Time of Arrival"
                     disablePast
                     value={arrivalDate}
                     onChange={ handleChangeOfArrival}
                     renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6} />
              </Grid>

              { createdFlag ?  <Alert severity="success">
          <AlertTitle>Created Successfully</AlertTitle>
            
            </Alert>  : <> </> }
            { createdFailed?  <Alert severity="error">
          <AlertTitle>Created Failed</AlertTitle>
            Try Change The FlightNumer
            </Alert>  : <> </> }
            <Button
              type="submit"
              fullWidth
              endIcon= {<NoteAddIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>

         
            </Box>
            </Collapse>
            </Box>
            
            </Container>



            </div>

            
    )
}

export default CreateFlight
