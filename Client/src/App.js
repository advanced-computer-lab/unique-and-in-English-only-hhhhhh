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
import UserSearch from './components/UserSearch';
import EditFlight from './components/EditFlight';
import Combine from './components/Combine';
import Profile from './components/Profile/Profile';
import UserFlightCard from './components/UserFlightCard';
import UserSeachFlight from './components/UserSearchFlight'
import Seat from './components/Seat';
import UserFlightTicket from './components/UserFlightTicket';
import UserSearchResult from './components/UserSearchResult';
import SeatParent from './components/SeatParent';
import Ticket from './components/Ticket';
import ReservationSummaryParent from './components/ReservationSummaryParent'
import  CreditCard  from './components/CreditCard/CreditCard.js';



function App(props) {
  console.log(localStorage.getItem('username'));
   console.log(localStorage.getItem('user token'));
  return (
   <Router>   
   {   <Header  isLogged={props.isLogged}  userName={props.userName}/>   }
   <div className="mt-14" />
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

<Route path="/credit">
  <CreditCard />
</Route>

<Route path="/test1" render={(props) => <ReservationSummaryParent {...props}/>}/> 

<Route path="/test2">
   <Ticket></Ticket>
</Route>
<Route path="/test3">
  <Profile />
</Route>
<Route path="/test4">
  <SeatParent />
</Route>
<Route path="/test5" render={(props) => <UserSearchResult {...props}/>}/>


<Route path="/edit">
  <EditFlight />
</Route>

<Route path="/*">
  <Error />
</Route>

</Switch>
<div className="mb-32" />
<Footer />
   </ Router>


);
}

export default App;
