import React, { Component } from "react";
import SeatPicker from "react-seat-picker";

export default class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: this.props.seat
    };
  }

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.props.setSelected((prevItems) => [...prevItems, id]);
    const newTooltip = `You Have Selected Seat row ${row}, number ${number} in Your Desired Class`;
    addCb(row, number, id, newTooltip);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.props.setSelected((list) => list.filter((item) => item !== id));
    removeCb(row, number);
  };

  // componentDidMount() {
  //  console.log(this.props.seat);
  // }
  componentDidUpdate() {
    console.log(this.props.seat);
    this.state.seats = this.props.seat;
  }

  render() {
    
    return (
      <div >
        <SeatPicker
          addSeatCallback={this.addSeatCallback.bind(this)}
          removeSeatCallback={this.removeSeatCallback.bind(this)}
          rows={this.props.seat}
          maxReservableSeats={parseInt(this.props.maxNumber) }
          visible
          selectedByDefault
          loading={false}
        />
      </div>
    );
  }
}
