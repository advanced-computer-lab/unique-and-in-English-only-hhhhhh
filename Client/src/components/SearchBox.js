import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { Container   } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { IconButton } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import FlightCard from './FlightCard';
import { useEffect } from 'react';
import axios from 'axios';

const SearchBox = (props) => {
    const [checked, setChecked] = React.useState(true);
    
    const [ flightNumber , setFlightNumber ]= React.useState("");
    const [ ecoSeatsCount , setEcoSeatsCount ]= React.useState("");
    const [ businessSeatsCount , setBusinessSeatsCount ]= React.useState("");
    const [departureDate, setDepartureDate] = React.useState(  new Date() );
    const [arrivalDate, setarrivalDate] = React.useState( new Date() );
    const [ departureAirportTerminal , setDepartureAirportTerminal ]= React.useState("");
    const [ arrivalAirportTerminal , setArrivalAirportTerminal ]= React.useState("");
    
    
    
    
  const clickOnTheIcon = () => {
    setChecked((prev) => !prev);
  };

    const handleChangeOfDeparture = (newValue) => {
      setDepartureDate(newValue);
      if ( newValue.getTime() > arrivalDate.getTime() ) {
        setarrivalDate(newValue);
      }
    };

    const handleChangeOfArrival = (newValue) => {
      if (newValue.getTime() <= departureDate.getTime()) {
        setarrivalDate(arrivalDate);
      }
      else{
        setarrivalDate(newValue);
      }        
    };


  const handleSubmit = (event) => {
    event.preventDefault();

    const flight = {
      flightNumber: flightNumber,
      ecoSeatsCount:ecoSeatsCount ,
      businessSeatsCount:businessSeatsCount,
      departureDate:departureDate,
      arrivalDate:arrivalDate,
      departureAirportTerminal:departureAirportTerminal,
      arrivalAirportTerminal:arrivalAirportTerminal,
      }
      console.log(flight);
      props.Changedata(flight);
  };


    return (

        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={clickOnTheIcon}>
          <Avatar  sx={{ m: 1, bgcolor: 'primary.main' }}>
            <SearchIcon  />
          </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            Search Flights, ADMIN !
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
                  placeholder="EX. AB 1500"
                  inputProps={{ maxLength: 7 }}
                  onChange = {(e) => {setFlightNumber(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  
                  id="departureAirportTerminal"
                  name="departureAirportTerminal"
                  label="from"
                  placeholder="Country, City or Airport"
                  onChange = {(e) => {setDepartureAirportTerminal(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="arrivalAirportTerminal"
                  required
                  fullWidth
                  
                  id="arrivalAirportTerminal"
                  label="To"
                  placeholder="Country, City or Airport"
                  onChange = {(e) => {setArrivalAirportTerminal(e.target.value)}}
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
                     value={arrivalDate}
                     onChange={ handleChangeOfArrival }
                     renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              endIcon={<SearchIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Box>
          </Collapse>
        </Box>
        </Container>

    )
}

export default SearchBox


