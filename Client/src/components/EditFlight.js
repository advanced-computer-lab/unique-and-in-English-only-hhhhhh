import React from 'react'
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
import { IconButton } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import { useEffect } from 'react';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Backdrop } from '@mui/material';
import { Modal } from '@mui/material';
import { Fade } from '@mui/material';

const style = {
    display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const EditFlight = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = React.useState(true);
    const [departureDate, setDepartureDate] = React.useState();
    const [returnDate, setReturnDate] = React.useState();

    const [state, setState] = React.useState(/*{     props.departureDate         props.arrivalDate
      flightNumber: props.flightNumber,
      ecoSeatsCount: props.ecoSeatsCount,
      businessSeatsCount: props.businessSeatsCount,
      departureDate: departureDate,
      arrivalDate: returnDate,
      departureAirportTerminal: props.departureAirportTerminal,
      arrivalAirportTerminal: props.arrivalAirportTerminal,
      }*/);
    
      
    const onChangeData = (e)=> {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
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
      setState(prevState => ({
        ...prevState,
        ["departureDate"]: departureDate
    }));
    };

    const handleChangeOfReturn = (newValue) => {
     if (newValue.getTime() <= departureDate.getTime()) {
        setReturnDate(returnDate);
      }
      else{
        setReturnDate(newValue);
      }
      setState(prevState => ({
        ...prevState,
        ["arrivalDate"]: returnDate
    }));
        
    };

    
      
    const handleSubmit = (event) => {
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

      axios.post('http://localhost:8000/admin/createFlight' , flight )
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err => {
        console.log(err)
    });

    };
   
    return (
        <>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        {...props}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
         <Fade in={props.open}>
          <Box sx={style}>
          <IconButton sx={{alignItems:"center"}}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <ModeEditIcon  />
          </Avatar>
          </IconButton>
          <Typography component="h1" variant="h5">
            Edit The Flight ya kbeer
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
                  onChange={(event) =>{
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
            endIcon={<ModeEditIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
            </Box>
            </Box>
            </Fade>
            </Modal> 
            </>
    )
}

export default EditFlight
