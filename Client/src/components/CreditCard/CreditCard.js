import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { TextField , Select , MenuItem } from "@mui/material";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styles from "./styles.css";

const CreditCard = (props) => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [month, SetMonth] = useState("");
  let [expiry, SetExpiry] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");
  const [error, setError] = React.useState(false);
  const handleDate = (e) => {
    props.setExpMonth(e.target.value);
    SetMonth(e.target.value)
    SetExpiry(e.target.value);
  };
  const handleExpiry = (e) => {
    SetExpiry(month.concat(e.target.value));
    props.setExpYear( e.target.value);
  };


  React.useEffect( ()=> {
   props.setCardNumber(number);
   props.setCvv(cvc);
  });


  return (
    <>
      {/* <div className="rccs__card backcolor"> */}
      <div className="flex justify-center mt-5  ">
          <div className="flex justify-center w-3/6 bg-blue-100 pb-16 pl-16 rounded-full">



      <div clasName="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />
      <form>
        <div className="row">
          <div className="col-sm-11">
            
            
            <TextField 
              type="number"
              className="form-control"
              name="number"
              label = 'Card Number'
              variant = 'standard'
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,16)
              }}
              onChange={(e) => {
                SetNumber(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></TextField >
            
          </div>
        </div>
        <br />
        <div className="">
          <div className="">
           
            <TextField
              type="text"
              className="form-control"
              label = 'Card Name'
              variant = 'standard'
              name="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></TextField>
          </div>
        </div>
        <br />
        <div className="justify-between flex w-5/6">
          <div
            className="col=sm-8"
           
          >
            <label for="month">Expiration Date</label>
          </div>
          <div className=" col=sm-8 ">
          </div>
        </div>

        <div className="flex">
          <div className="col-sm-4">
            <Select
              sx={{ width: 100 , height: 40}}
              className="form-control"
              name="expiry"
              onChange={handleDate}
            >
              <MenuItem value=" ">Month</MenuItem>
              <MenuItem value="01">Jan</MenuItem>
              <MenuItem value="02">Feb</MenuItem>
              <MenuItem value="03">Mar</MenuItem>
              <MenuItem value="04">April</MenuItem>
              <MenuItem value="05">May</MenuItem>
              <MenuItem value="06">June</MenuItem>
              <MenuItem value="07">July</MenuItem>
              <MenuItem value="08">Aug</MenuItem>
              <MenuItem value="09">Sep</MenuItem>
              <MenuItem value="10">Oct</MenuItem>
              <MenuItem value="11">Nov</MenuItem>
              <MenuItem value="12">Dec</MenuItem>
            </Select>
          </div>
          
          <div className="col-sm-4">
            <Select
              sx={{ width: 100 , height: 40 }}
              className="form-control"
              name="expiry"
              onChange={handleExpiry}
            >
              <MenuItem value=" ">Year</MenuItem>
              <MenuItem value="21">2021</MenuItem>
              <MenuItem value="22">2022</MenuItem>
              <MenuItem value="23">2023</MenuItem>
              <MenuItem value="24">2024</MenuItem>
              <MenuItem value="25">2025</MenuItem>
              <MenuItem value="26">2026</MenuItem>
              <MenuItem value="27">2027</MenuItem>
              <MenuItem value="28">2028</MenuItem>
              <MenuItem value="29">2029</MenuItem>
              <MenuItem value="30">2030</MenuItem>
            </Select> 
          </div>
          
        </div>
        <br />
        <div className="col-sm-3">
            <TextField
              type="number"
              name="cvc"
              maxlength="3"
              className=" form-control "
              label = "CVC"
              value={cvc}
              variant='standard'
              onChange={(e) => {         
                  SetCvc(e.target.value);    
              }}
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></TextField>
          </div>
        
        
      </form>

      </div>
      </div>
    </>
  );
};
export default CreditCard;
