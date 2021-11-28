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


const TravellerInfo = () => {
    const [gender, setGender] = React.useState('');
    const [country, setCountry] = useState("");
    const [birth, setBirth] = React.useState('1/5/2000');
    const handleChangeGender = (event) => {
        setGender(event.target.value);
     };
     const handleChangeCountry = (event , value) => {
        setCountry(value["label"]);
        console.log(country);
      };

    return (
        <div className="inline-grid justify-items-center justify-center" >
            <Box  className="inline-grid justify-items-center"
            component="form" noValidate onSubmit={() => { console.log("Hi"); } } sx={{ mt: 3 }}>
            <Grid container spacing={2}>

               
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lasttName"
                  fullWidth
                  id="lasttName"
                  label="Last Name"
                  placeholder="Last Name"
                  autoFocus
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
          onChange={handleChangeGender}
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
      renderInput={(params) => <TextField {...params} label="Country" />}
      onChange={handleChangeCountry}
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
    )
}

export default TravellerInfo
