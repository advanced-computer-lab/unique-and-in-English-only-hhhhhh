import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import axios from 'axios';
import Notification from '../Notification';
import SaveIcon from '@mui/icons-material/Save';






const TravellerSensitiveData = (props) => {
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [email, setEmail] = React.useState(props.email);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    var match = true ;
     const user = {
      userName: localStorage.getItem('username'),
      password: oldPassword,
      update:{
        password: newPassword,
        email: email
    }
  };
  console.log(user);
  if ( confirmNewPassword != newPassword ){
    match = false ;
  }
if ( match ){
  await axios.put('http://localhost:8000/user/updateSensitiveUserInfo' , user ).then(res => {
    console.log(res.data);
    setNotify({
      isOpen: true,
      message: res.data.message,
      type: (res.data.message == "User updated") ? 'success' :'error'
  })
  }).catch(err => {
    console.log(err);
    setNotify({
      isOpen: true,
      message: 'Error with The SERVER and Faild to Update',
      type: 'error'
  });
});
}
else {
  setNotify({
    isOpen: true,
    message: 'The new Password and its Confirmation Does not match',
    type: 'error'
});
}


      
    };

    return (
      <>
      <Notification
            notify={notify}
            setNotify={setNotify}
                      />

        <div className="inline-grid justify-items-center justify-center" >
        <Box  className="inline-grid justify-items-center"
        component="form" noValidate onSubmit={ handleSubmit } sx={{ mt: 3 }}>
        <Grid container spacing={2}>


        <Grid item xs={12} >
                <TextField
                type="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="E-Mail"
                  placeholder="E-Mail"
                  autoFocus
                  onChange= { e => {setEmail(e.target.value)}}
                  inputProps= { {defaultValue: props.email   } }
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                type="password"
                  name="old password"
                  fullWidth
                  id="old password"
                  label="Old Password"
                  placeholder="Old Password"
                  autoFocus
                  onChange= { e => {setOldPassword(e.target.value)}}

                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                type="password"
                  name="new password"
                  fullWidth
                  id="new password"
                  label="New Password"
                  placeholder="New Password"
                  autoFocus
                  onChange= { e => {setNewPassword(e.target.value)}}

                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                type="password"
                  name="confirm new password"
                  fullWidth
                  id="confirm new password"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  autoFocus
                  onChange= { e => {setConfirmNewPassword(e.target.value)}}

                />
              </Grid>

              <Button
              type="submit"
              fullWidth
              startIcon= {<SaveIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>


            </Grid>
            </Box>
            </div>
            </>

    );
}

export default TravellerSensitiveData
