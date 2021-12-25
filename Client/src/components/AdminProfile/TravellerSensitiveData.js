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
  const [email, setEmail] = React.useState('');
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
      message: res.data,
      type: (res.data == 'incorrect username or password') ? 'warning' :'success'
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
                disabled
                type="username"
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  
                  autoFocus
                  
                  inputProps= { {defaultValue: localStorage.getItem('username')  } }
                />
              </Grid>
              

              

              <Grid item xs={12} >
                <TextField
                disabled
                type="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="email"
                  placeholder="email"
                  inputProps= { {defaultValue: localStorage.getItem('adminEmail')  } }
                  

                />
              </Grid>

              


            </Grid>
            </Box>
            </div>
            </>

    );
}

export default TravellerSensitiveData
