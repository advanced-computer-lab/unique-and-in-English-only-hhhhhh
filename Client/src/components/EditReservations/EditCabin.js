import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EditSmallReservation from './EditSmallReservation'
import {InputLabel, MenuItem, Select} from '@mui/material'
import { Box } from '@mui/system';
import SelectInput from '@mui/material/Select/SelectInput';
import useForceUpdate from 'use-force-update';


const EditCabin = (props) => {
    const [value, setValue] = React.useState(props.cabinClass);
    const forceUpdate = useForceUpdate();


  const handleChange = (event) => {
    setValue(event.target.value);
    //forceUpdate();
    console.log( value == "economic" );
    console.log( value );
  };
//   React.useEffect( ()=> {
//     setValue(props.cabinClass);
//   }, [props.cabinClass])
    return (
        <div className=''>
             {/* <FormControl component="fieldset">
      <FormLabel component="legend">The Cabin Class</FormLabel>
      <RadioGroup
        aria-label="gender"
        value={ value }
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="business" control={<Radio />} label="Business" />
        <FormControlLabel value="economic" control={<Radio />} label="Economic" />
      </RadioGroup>
    </FormControl> */}
<div className='flex justify-center'>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="class">Class</InputLabel>
        <Select
        sx={{ width: 120 }}
        autoFocus
          labelId="class"
          id="class"
          value={value}
          label="CLASS"
          onChange={ e => {handleChange(e)} }
        >
          <MenuItem value={"economic"}>Economic</MenuItem>
          <MenuItem value={"business"}>Business</MenuItem>
        </Select>
      </FormControl>
    </Box>
</div>
{
    value == "economic" ? 
    <>
    <div className='ml-32 '>
    <EditSmallReservation
    seats = { value == props.cabinClass? props.seats : [] }
    cabinClass = { "economic" }
    type = { props.type }
    _id = { props._id }
    reservationId = { props.reservationId }
    openwind = { true }
    isComp = { (boolean) => props.isComp(boolean) }
    theUpdate = { (value) => props.theUpdate(value) }
     />
     </div>
     <div></div>
       </>   
    :
    <div className='flex justify-center ml-16 '>
    <EditSmallReservation
    seats = { value == props.cabinClass? props.seats : [] }
    cabinClass = { "business" }
    type = { props.type }
    _id = { props._id }
    reservationId = { props.reservationId }
    openwind = { true }
    isComp = { (boolean) => props.isComp(boolean) }
    theUpdate = { (value) => props.theUpdate(value) }
     />     
     </div>
}
    
        </div>
    )
}

export default EditCabin
