import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FlightTakeoffOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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

export default function SignUp2() {
  const [firstName,setFirstName] = React.useState("");
  const [lastName,setLastName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [confirmPassword,setConfirmPassword] = React.useState("");
  const [passportNumber,setPassportNumber] = React.useState("");
  const [error,setError] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username == "" || firstName =="" || lastName == "" || email == "" || password == "" || confirmPassword == "" || passportNumber == ""){
      setError(true);}
    else{
      if(password != confirmPassword){
        alert("not equal");
      }
      else{
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        password: password,
        gender:"",
        country:"",
        telephoneNumber:"",
        dateOfBirth: "",
        passportNumber: passportNumber
      };
      await axios.post('http://localhost:8000/guest/sign-up' , newUser)
      .then((result) => {
        console.log(result.data.message);
        if(result.data.message == "Success")
          setFinish(true);
      }).catch(err => {
        console.log(err);
    });
    }
    }
    

  };

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                  error = {error && (username == "")}
                  onChange = {e=>{setUsername(e.target.value)}}
                />
                </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error = {error && (firstName == "")}
                  onChange = {e=>{setFirstName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error = {error && (lastName == "")}
                  onChange = {e=>{setLastName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error = {error && (email == "")}
                  onChange = {e=>{setEmail(e.target.value)}}
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
                  error = {error && (password == "")}
                  onChange = {e=>{setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  error = {error && (confirmPassword == "")}
                  onChange = {e=>{setConfirmPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="passportNumber"
                  required
                  fullWidth
                  id="passportNumber"
                  label="Passport Number"
                  autoFocus
                  error = {error && (passportNumber == "")}
                  onChange = {e=>{setPassportNumber(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }}  />
      </Container>
    </ThemeProvider>
    { finish ?
      <Redirect
      to={{
      pathname: "/login",
    }}
  /> : <></>
      }
      </>
  );
}