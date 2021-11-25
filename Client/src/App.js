import './App.css';
import React from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import  Header  from './components/Header.js';
import Login  from './components/Login.js';
import Showcase from './components/Showcase.js';
import Footer  from './components/Footer.js';
import Destinations from './components/Destinations';
import Error from './components/Error';
import SignUp2 from './components/Signup2'
import Advertisement from './components/Advertisement';
import CreateFlight from './components/CreateFlight';
import EditFlight from './components/EditFlight';
import Combine from './components/Combine';
import Profile from './components/Profile/Profile';
import UserFlightCard from './components/UserFlightCard';


function App(props) {
  return (
   <Router>
   {  /* <Header  isLogged={props.isLogged}  userName={props.userName}/>   */ }
     <Switch>
<Route exact path="/">
<Showcase />
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

<Route path="/test">
  <UserFlightCard />
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
