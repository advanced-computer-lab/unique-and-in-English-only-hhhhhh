import './App.css';
import React from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import  Header  from './components/Header.js';
import Login  from './components/Login.js';
import SignUp from './components/Signup.js';
import Showcase from './components/Showcase.js';
import Footer  from './components/Footer.js';
import Destinations from './components/Destinations';
import Error from './components/Error';
import SignUp2 from './components/Signup2'
import Advertisement from './components/Advertisement';
import SearchBox from './components/SearchBox';
import CreateFlight from './components/CreateFlight';
import FlightCard from './components/FlightCard';
import { Grid } from '@mui/material';
import EditFlight from './components/EditFlight';


function App(props) {
  return (
   <Router>
   { /* <Header  isLogged={props.isLogged}/>   */ }
     <Switch>
<Route exact path="/">
<Showcase isReloaded={true}/>
<Destinations />
<Advertisement />
</Route>

<Route path="/login">
  <Login/>
</Route>

<Route path="/signup">
  <SignUp2 />
</Route>


<Route path="/createFlight">
  <CreateFlight />
</Route>

<Route path="/search">
  <SearchBox />
</Route>

<Route path="/test">
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
    <Grid item xs={4} sx={{minWidth: "450px"}}>
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>

    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>

    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>

    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>

    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>


    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>


    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>


    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>


    <Grid item xs={4} sx={{minWidth: "450px"}} >
    <FlightCard  flightNumber={"AB 200"}
   departureDate= {new Date()}
   arrivalDate= {new Date()}
   departureAirportTerminal="Cairo"
   arrivalAirportTerminal="Turkey"
   />
    </Grid>

    
</Grid>
</Route>

<Route path="/edit">
  <EditFlight />
</Route>

<Route path="/*">
  <Error />
</Route>

</Switch>

<Footer />
   </ Router>


);
}

export default App;
