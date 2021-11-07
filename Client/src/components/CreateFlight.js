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
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
 

const CreateFlight = () => {
    const [checked, setChecked] = React.useState(true);
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [returnDate, setReturnDate] = React.useState(new Date());
    const [flag , setFlag] = React.useState(true);
  

    const [state, setState] = React.useState({
      flightNumber:"",
      ecoSeatsCount:"",
      businessSeatsCount:"",
      departureDate: '',
      arrivalDate: '',
      departureAirportTerminal:"",
      arrivalAirportTerminal:"",
      });
    

    const onChangeData = (e)=> {
      setState( {...state , [e.target.name]: e.target.value} );
      console.log(state)
    };

    const clickOnTheIcon = () => {
      setChecked((prev) => !prev);
    };

    const handleChangeOfDeparture = (newValue) => {
      setDepartureDate(newValue);
      if ( newValue.getTime() > returnDate.getTime() ) {
        setReturnDate(newValue);
      }
      setState( {...state , ["departureDate"]: departureDate} );
    };

    const handleChangeOfReturn = (newValue) => {
     if (newValue.getTime() <= departureDate.getTime()) {
        setReturnDate(returnDate);
      }
      else{
        setReturnDate(newValue);
      }
      setState( {...state , ["arrivalDate"]:returnDate} );
        
    };

    
      
    const handleSubmit = async (event) => {
      event.preventDefault();
      const flight = {
      flightNumber: state["flightNumber"],
      ecoSeatsCount:state["ecoSeatsCount"],
      businessSeatsCount:state["businessSeatsCount"],
      departureDate:state["departureDate"],
      arrivalDate:state["arrivalDate"],
      departureAirportTerminal:state["departureAirportTerminal"],
      arrivalAirportTerminal:state["arrivalAirportTerminal"],
      }

      Object.keys(flight).forEach(key => {
        if (flight[key] == "" ){
          setFlag(false);
        }
    })
     if(flag){
      await axios.post('http://localhost:8000/admin/createFlight' , flight )
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err => {
        console.log(err)
    });
  }
  else{
    alert("Some Fields Are Empty");
  }
    };
   
    return (
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
            Create New Flight Ya Basha
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
                  onChange = { (event) =>  setState( {...state , [event.target.name] : event.target.value })   }
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
                  onChange = {onChangeData}
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
                  onChange = {onChangeData}
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
                    onChangeData(event);
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
                    onChangeData(event);
                }
              }
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
                     onChange={handleChangeOfDeparture  }
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
                     value={returnDate}
                     onChange={handleChangeOfReturn}
                     renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
              </Grid>

              </Grid>
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

            

            
    )
}

export default CreateFlight
