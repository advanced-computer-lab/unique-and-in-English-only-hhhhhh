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
import Combine from './components/Combine';


function App(props) {
  return (
   <Router>
   {  <Header  isLogged={props.isLogged}  userName={props.userName}/>    }
     <Switch>
<Route exact path="/user/*">
<Showcase isReloaded={true}/>
<Destinations />
<Advertisement />
</Route>

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
  <Combine />
</Route>

<Route path="/test2">
  <Combine />
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
