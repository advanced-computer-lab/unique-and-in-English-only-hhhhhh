import { Button } from "@mui/material";
import React from "react";
import ReactCardFlip from 'react-card-flip';
import UserFlightCard from "./UserFlightCard";

export default class App extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false,
        store : true
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    handleReload(){
      this.props.reload(  this.state.store );
      this.setState(prevState => ({ store: !prevState.store }));  
    }
    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard
                      reservationId = { this.props.reservationId}
                      _id = {this.props.departureFlight._id}
                      flightNumber= {this.props.departureFlight.flightNumber}
                      ecoSeatsCount= {this.props.departureFlight.ecoSeatsCount}
                      economicSeatPrice= {this.props.departureFlight.economicSeatPrice}
                      businessSeatsCount= {this.props.departureFlight.businessSeatsCount}
                      businessSeatPrice= {this.props.departureFlight.businessSeatPrice}
                      departureDate= {this.props.departureFlight.departureDate}
                      arrivalDate= {this.props.departureFlight.arrivalDate}
                      departureAirportTerminal= {this.props.departureFlight.departureAirportTerminal}
                      arrivalAirportTerminal= {this.props.departureFlight.arrivalAirportTerminal}
                      seats = {this.props.departureSeats}
                      cabinClass = {this.props.cabinClass}
                      passengerName = {this.props.passengerName}
                      totalPrice = {this.props.totalPrice}
                      reservationId = {this.props.reservationId}
                      type = "Departure Flight"
                      reload = { (val) => this.handleReload(val) }
                    />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
          
            
  
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard
                    reservationId = { this.props.reservationId}
                    _id = {this.props.returnFlight._id}
                    flightNumber= {this.props.returnFlight.flightNumber}
                    ecoSeatsCount= {this.props.returnFlight.ecoSeatsCount}
                    economicSeatPrice= {this.props.returnFlight.economicSeatPrice}
                    businessSeatsCount= {this.props.returnFlight.businessSeatsCount}
                    businessSeatPrice= {this.props.returnFlight.businessSeatPrice}
                    departureDate= {this.props.returnFlight.departureDate}
                    arrivalDate= {this.props.returnFlight.arrivalDate}
                    departureAirportTerminal= {this.props.returnFlight.departureAirportTerminal}
                    arrivalAirportTerminal= {this.props.returnFlight.arrivalAirportTerminal}
                    seats = {this.props.returnSeats}
                    cabinClass = {this.props.cabinClass}
                    passengerName = {this.props.passengerName}
                    totalPrice = {this.props.totalPrice}
                    reservationId = {this.props.reservationId}
                    type = "Return Flight"
                    reload = { (val) => this.handleReload(val) }
                     />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
            
        </ReactCardFlip>
      )
    }
  }
  