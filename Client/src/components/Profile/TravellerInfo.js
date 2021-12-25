import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Countries from "./Countries";
import { Autocomplete } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Notification';
import axios from 'axios';



const TravellerInfo = ( props ) => {
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [gender, setGender] = React.useState('');
    const [country, setCountry] = useState("");
    const [birth, setBirth] = React.useState('1/5/2000');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = useState("");
    const [passport , setPassport] = React.useState('');
    const [telephone , setTelephone] = React.useState(0);

     const handleSubmit = async (event) => {
      event.preventDefault();
       const user = {
        userName:localStorage.getItem('username'),
        update:{
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            country: country,
            telephoneNumber: telephone,
            passportNumber: passport
        }
    };
    console.log(user);


    await axios.put('http://localhost:8000/user/updateUserInfo' , user )
    .then(res => {
      console.log(res.data);
      setNotify({
        isOpen: true,
        message: 'You Information Has Been Updated Successfully',
        type: 'success'
    })
    }).catch(err => {
      console.log(err);
      setNotify({
        isOpen: true,
        message: 'Error with The SERVER and Faild to Update',
        type: 'error'
    });
  });

        
      };

    return (
      <>
      <Notification
            notify={notify}
            setNotify={setNotify}
                      />

        <div className="inline-grid justify-items-center justify-center" >
            <Box  className="inline-grid justify-items-center"
            component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

               
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  autoFocus
                  onChange= { e => {setFirstName(e.target.value)}}
                  inputProps= { {defaultValue: props.user.firstName } }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  autoFocus
                  onChange= { e => {setLastName(e.target.value)}}
                  inputProps= { {defaultValue: props.user.lastName } }
                />
              </Grid>
              
              

              <Grid item xs={12} sm={6} >
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="gender">Gender</InputLabel>
        <Select
        sx={{ width: 400 }}
        autoFocus
          labelId="gender"
          id="gender"
          value={gender}
          label="Gender"
          onChange={ e => {setGender(e.target.value)} }
          >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Grid>
        <Grid item xs={12} sm={6} />

        <Grid item xs={12} sm={6} >
        <Autocomplete
      disablePortal
      id="country-select"
      options={Countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Country" defaultValue={props.user.country} />}
      onChange={ (e , value) => {setCountry(value["label"])} }
      defaultValue={{ code: 'AD', label:props.user.country , phone: '376' }}
      />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={6} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack  sx={{ width: 400 }} spacing={1}>
        <MobileDatePicker
        
          label="Date Of Birth"
          value={birth}
          onChange={(newValue) => {
            setBirth(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          // inputProps= { {defaultValue: props.user.dateOfBirth } }
        />
        </Stack>
    </LocalizationProvider>
</Grid>

<Grid item xs={12} sm={6} />
<Grid item xs={12} sm={6} >
<TextField
                  name="passport"
                  fullWidth
                  id="passport"
                  label="Passport Number"
                  placeholder="Passport Number"
                  autoFocus
                  onChange={ (e) => {setPassport(e.target.value)} }
                  inputProps= { {defaultValue: props.user.passportNumber } }
                />
  </Grid>

<Grid item xs={12} sm={6} />
<Grid item xs={12} sm={6} >
<TextField
                  name="telephone"
                  fullWidth
                  type = "tel"
                  id="telephone"
                  label="Telephone Number"
                  placeholder="Telephone Number"
                  autoFocus
                  onChange={ (e) => {setTelephone(e.target.value)} }
                  inputProps= { {defaultValue: props.user.telephoneNumber } }
                />
  </Grid>

            </Grid>
            <Stack  sx={{ width: 400 }} spacing={1}>
              <Button
              type="submit"
              fullWidth
              startIcon= {<SaveIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
           </Stack>

         
            </Box>
        
        </div>
        </>
    );
}

export default TravellerInfo
