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

const SearchBox = () => {
    const [checked, setChecked] = React.useState(true);
    const [departureDate, setDepartureDate] = React.useState();
    const [returnDate, setReturnDate] = React.useState();
    const [allState , setAllState] = React.useState([]);
    const [state, setState] = React.useState({
      flightNumber:'',
      ecoSeatsCount:'',
      businessSeatsCount:'',
      departureDate:'',
      arrivalDate:'',
      departureAirportTerminal:'',
      arrivalAirportTerminal:'',
      });


      useEffect(() => {
        axios.get('http://localhost:8000/admin/readFlight')
      .then((result) => {
        setAllState(result.data);
      });

      },[]);
      
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


  const options = top100Films.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            Search Now Ya ADMIN xD!!!
          </Typography>

          <Collapse in={checked}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="flightNumber"
                  label="Flight Number"
                  name="flightNumber"
                  helperText="Max 7 Charchters"
                  placeholder="EX. AB 1500"
                  inputProps={{ maxLength: 7 }}
                  onChange = {onChangeData}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
            <h5>From</h5>
                    <Autocomplete
                        disablePortal
                        id="depaturePlace"
                        name="departureAirportTerminal"
                        onChange={ (event, value) => setState(prevState => ({
                          ...prevState,
                          ["departureAirportTerminal"]: value.label
                      }))
                    
                    }
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.label}
                        sx={{ width: 190 }}
                        renderInput={(params) => <TextField {...params} placeholder="Country, City or Airport"/>}/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <h5>To</h5>
                    <Autocomplete
                        disablePortal
                        id="arrivalPlace"
                        name="arrivalAirportTerminal"
                        onChange={ (event, value) => setState(prevState => ({
                          ...prevState,
                          ["departureAirportTerminal"]: value.label
                      }))
                    
                    }
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.label}
                        sx={{ width: 190 }}
                        renderInput={(params) => <TextField {...params} placeholder="Country, City or Airport"/>}/>
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
              endIcon={<SearchIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Box>
          </Collapse>
        </Box>

        <Grid   container
        display="flex"
        alignContent="center"
        alignItems="center"
        justifyContent = "center"
        wrap="wrap"
        padding= "120px"
        spacing={15}
        gridtemplatecolumns= "repeat(3, 300px)"
>
{ allState.map((oneElement) =>


    <Grid item xs={4} sx={{minWidth: "450px"}}>
    <FlightCard  flightNumber={oneElement.flightNumber}
   departureDate ={oneElement.departureDate}
   arrivalDate ={oneElement.arrivalDate}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   />
    </Grid>


 )}




</Grid>
        
        
      </Container>
    )
}

export default SearchBox

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 }
  ];
