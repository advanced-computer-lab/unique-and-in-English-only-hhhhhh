import { Details } from '@material-ui/icons';
import { Box, width } from '@mui/system';
import React from 'react'
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { FlightTakeoffOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { Alert } from '@mui/material';
import App from '../App';
import { Redirect } from 'react-router';
import { render } from 'react-dom';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Zeyad Tayara
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

 const AdminLogin = (props) => {
  const [username,setUsername] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [message , setMessage] = React.useState({isVisible: false , message: "I am here"});
  const [logged , setLogged ] = React.useState( props.isLogged );
  const [error , setError] = React.useState(false);
  const [finish, setFinish] = React.useState(false);



const handleSubmit = async (event) => {
  event.preventDefault();
  if(email == "" || password == "" ){
    setError(true);}
  else{
    const user = {
      email:   email ,
      password:   password 
    }
    await axios.post('http://localhost:8000/admin/login' , user)
    .then(res => {
      console.log(res);
      if(res.data.message == "Success"){
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('adminEmail', user.email);
        localStorage.setItem('user token', res.data.token);
        localStorage.setItem('type', res.data.type);
        setLogged(true);
        setEmail(user.email);
        setUsername(res.data.username);
        setFinish(true);
        
        
        //setMessage( {isVisible: true , message: res.data+ ""} );
      }
        
    }).catch(err => {
      alert("Connection Error with the server");
  });
  }
  //console.log(message);
  

};
if ( logged == true ) {

  return (
    window.location.href='/'
)
}
else {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <FlightTakeoffOutlined  />
          </Avatar>
          <Typography component="h1" variant="h5">
            AdminLogin
          </Typography>
          {console.log("wtf")}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  error = {error && email == ""}
                  onChange={ e => { setEmail(e.target.value); setMessage({isVisible:false, message:""});}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={ e => { setPassword(e.target.value); setMessage({isVisible:false, message:""});}}
                />
              </Grid>
            </Grid>
            <br />
            {
            message.isVisible && <Alert severity="warning"> {message.message} </Alert>
          }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="/signup" variant="body2">
                  Don't Have an account? Sign Up !!
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }}  />
      </Container>
    </ThemeProvider>
    
      </>
  );
}





}


export default AdminLogin ;

