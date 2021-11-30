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
    const rows = [
      [
        { id: 1, number: "A1" },
        { id: 2, number: "A2" },
        { id: 3, number: "A3" },
        { id: 4, number: "A4" },
        null,
        { id: 5, number: "A5" },
        { id: 6, number: "A6" },
        { id: 7, number: "A7" },
        { id: 8, number: "A8" },
        { id: 9, number: "A9", isReserved: true }
      ],
        []
      ,
      [
        { id: 11, number: 1 },
        { id: 12, number: 2 },
        { id: 13, number: 3, isReserved: true },
        { id: 14, number: 4 },
        null,
        { id: 15, number: 5 },
        { id: 16, number: 6 },
        { id: 17, number: 7 },
        { id: 18, number: 8 },
        { id: 19, number: 9 }
      ],
      [
        { id: 21, number: 1 },
        { id: 22, number: 2 },
        { id: 23, number: 3 },
        { id: 24, number: 4 },
        null,
        { id: 25, number: 5 },
        { id: 26, number: 6 },
        { id: 27, number: 7, isReserved: true },
        { id: 28, number: 8 },
        { id: 29, number: 9 },
        null,
        { id: 30, number: 10 },
        { id: 31, number: 11 },
        { id: 32, number: 12 }
      ]
    ];
    return (
      <div >
        <SeatPicker
          addSeatCallback={this.addSeatCallback.bind(this)}
          removeSeatCallback={this.removeSeatCallback.bind(this)}
          rows={rows}
          alpha
          maxReservableSeats={this.props.maxNumber}
          visible
        />
      </div>
    );
  }
}
