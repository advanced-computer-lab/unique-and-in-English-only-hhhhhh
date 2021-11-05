import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useState } from 'react';


const CreateFlight = () => {
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [returnDate, setReturnDate] = React.useState(new Date());

    const [state, setState] = useState({
      flightNumber:'',
      ecoSeatsCount:'',
      businessSeatsCount:'',
      departureDate:'',
      arrivalDate:'',
      departureAirportTerminal:'',
      arrivalAirportTerminal:''
      });
    

    const onChangeData = (e)=> {
      if (e.target.id == "departureDate") {
        this.setState({ [e.target.id]: Date.parse(e.target.value) });
      }
      else if (e.target.id == "arrivalDate") {
        this.setState({ [e.target.id]: Date.parse(e.target.value) });
      }
      else {
        this.setState({ [e.target.name]: e.target.value });
      }
      
    };


    const handleChangeOfDeparture = (newValue) => {
      if (Date.parse(newValue) > Date.parse(returnDate)) {
        setDepartureDate(departureDate);
      }
      else{
        setDepartureDate(newValue);
      }
    };

    const handleChangeOfReturn = (newValue) => {
      if (Date.parse(newValue) < Date.parse(departureDate)) {
        setReturnDate(returnDate);
      }
      else{
        setReturnDate(newValue);
      }
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <NoteAddIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Flight Ya Basha
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="flightNumber"
                  label="Flight Number"
                  name="flightNumber"
                  helperText="Max 7 Charchters"
                  placeholder="EX. PI 150"
                  inputProps={{ maxLength: 7 }}
                  onChange = {onChangeData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fromAirport"
                  required
                  fullWidth
                  id="departureAirportTerminal"
                  label="From"
                  placeholder="The Airport Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="arrivalAirportTerminal"
                  label="To"
                  name="toAirport"
                  placeholder="The Airport Name"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="businessSeats"
                  required
                  fullWidth
                  type="number"
                  id="businessSeatsCount"
                  label="Business Seats"
                  placeholder="Number of Seats"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 100){
                      event.target.value = 100
                    }
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
                  name="economicSeats"
                  placeholder="Number of Seats"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 500){
                      event.target.value = 500
                    }
                }
              }
                />
              </Grid>

              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                     id = "departureDate"
                     label="Date&Time of Depature"
                     disablePast
                     value={departureDate}
                     onChange={handleChangeOfDeparture}
                     renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
              </Grid>
              <Grid item xs={12 }>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                     id = "arrivalDate"
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
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            </Box>
            </Box>
            </Container>

            
    )
}

export default CreateFlight
