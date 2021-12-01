import { Button } from "@mui/material";
import React from "react";
import ReactCardFlip from 'react-card-flip';
import UserFlightCard from "./UserFlightCard";

export default class App extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  
    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
          
            
  
            <div className="w-full">
                <div className="flex justify-center mb-3">
                    <UserFlightCard />
                </div>
                <div className="flex justify-center mb-3">
                    <Button onClick={this.handleClick}>Click to flip</Button>
                </div>
            </div>
            
        </ReactCardFlip>
      )
    }
  }
  