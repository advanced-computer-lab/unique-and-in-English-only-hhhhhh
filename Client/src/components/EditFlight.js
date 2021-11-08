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
import { Alert, IconButton } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import { useEffect } from 'react';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Backdrop } from '@mui/material';
import { Modal } from '@mui/material';
import { Fade } from '@mui/material';
import { useHistory } from 'react-router';
import Notification from './Notification'
import { AlertTitle } from '@mui/material';





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
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = React.useState(true);
    const [departureDate, setDepartureDate] = React.useState(props.departureDate);
    const [returnDate, setReturnDate] = React.useState(props.arrivalDate);
    const [edit, setEdit] = React.useState(false);
    const history = useHistory() ;


    const [state, setState] = React.useState({    
      flightNumber: props.flightNumber,
      ecoSeatsCount: props.ecoSeatsCount,
      businessSeatsCount: props.businessSeatsCount,
      departureDate: props.departureDate,
      arrivalDate: props.arrivalDate,
      departureAirportTerminal: props.departureAirportTerminal,
      arrivalAirportTerminal: props.arrivalAirportTerminal,
      });
    
      
    const onChangeData = (e)=> {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
      setEdit(false);
    };

    const clickOnTheIcon = () => {
      setChecked((prev) => !prev);
      setEdit(false);
    };

    const handleChangeOfDeparture = (newValue) => {
      setDepartureDate(newValue);
      setEdit(false);
      if ( newValue > returnDate ) {
        setReturnDate(newValue);
      }
      setState(prevState => ({
        ...prevState,
        ["departureDate"]: departureDate
    }));
    };

    const handleChangeOfReturn = (newValue) => {
      setEdit(false);
     if (newValue <= departureDate) {
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
        search: {
          flightNumber: props.flightNumber,
          } , 
          update: {
            flightNumber: state["flightNumber"],
            ecoSeatsCount:   state["ecoSeatsCount"],
            businessSeatsCount:   state["businessSeatsCount"],
            departureDate:  new Date( state["departureDate"] ),
            arrivalDate:   new Date(state["arrivalDate"])  ,
            departureAirportTerminal:  state["departureAirportTerminal"] ,
            arrivalAirportTerminal:   state["arrivalAirportTerminal"],
          }
      }


      axios.put('http://localhost:8000/admin/updateFlight' , flight )
      .then(res => {
        setEdit(true);

      }).catch(err => {
        alert("Connection Error with the server" );
        
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
            Edit The Flight, Admin !
          </Typography>
          { edit ?  <Alert severity="success">
          <AlertTitle>Edited Successfully</AlertTitle>
            Please Reload The Page To See The Effect!
            </Alert>  : <> </> }
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
                  inputProps={{ maxLength: 7 , defaultValue: props.flightNumber }}
                  onChange = {onChangeData}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                inputProps= { {defaultValue: props.departureAirportTerminal   } }
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
                inputProps= { {defaultValue: props.arrivalAirportTerminal   } }
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
                inputProps= { {defaultValue: props.businessSeatsCount   } }
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
                inputProps= { {defaultValue: props.ecoSeatsCount   } }
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            </>
    )
}

export default EditFlight
