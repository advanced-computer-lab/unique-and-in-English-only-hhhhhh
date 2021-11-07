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

 const Login = (props) => {
const [details , setDetails] = React.useState({email:"" ,password:"" });
const [message , setMessage] = React.useState({isVisible: false , message: "I am here"});
const [logged , setLogged ] = React.useState( props.isLogged );

const adminUser = {
  email:"hello@me" ,
  password:"123" 
};

const handleSubmit = async (event) => {
  event.preventDefault();
    const user = {
      email:   details.email ,
      password:   details.password 
    }
    console.log( details.email);
    console.log(typeof(details.email));
    await axios.post('http://localhost:8000/admin/login' , user)
    .then(res => {
      setMessage( {isVisible: true , message: res.data+ ""} );
      console.log(message.message);
    }).catch(err => {
      alert("Connection Error with the server");
      console.log(err)
  });

  if (message.message.valueOf() == "success".valueOf()  ){
    setLogged(true);
   
  }

};
if ( logged == true ) {

  return (
    <App isLogged={true} userName={ details.email.toString() }/>
)
}
else {
  return (
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
            Login
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={ e => { setDetails({...details , email: e.target.value}); setMessage({isVisible:false, message:""});}}
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
                  onChange={ e => { setDetails({...details , password: e.target.value}); setMessage({isVisible:false, message:""});}}
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
                <Link href="/signup" variant="body2">
                  Don't Have an account? Sign Up !!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }}  />
      </Container>
    </ThemeProvider>
  );
}






}


export default Login ;

