import React, { Component } from "react";
import SeatPicker from "react-seat-picker";

export default class Seat extends Component {
  addSeatCallback = ({ row, number, id }, addCb) => {
    this.props.setSelected((prevItems) => [...prevItems, id]);
    const newTooltip = `You Have Selected Seat row ${row}, number ${number}`;
    addCb(row, number, id, newTooltip);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.props.setSelected((list) => list.filter((item) => item !== id));
    removeCb(row, number);
  };

  render() {
    
    return (
      <div >
        <SeatPicker
          addSeatCallback={this.addSeatCallback.bind(this)}
          removeSeatCallback={this.removeSeatCallback.bind(this)}
          rows={this.props.seat}
          maxReservableSeats={parseInt(this.props.maxNumber) }
          visible
        />
      </div>
    );
  }
}
