import React,{ useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';
import App from '../App';
import Link from '@mui/material/Link';

function Facebook() {
  const [username,setUsername] = React.useState("")
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [logged , setLogged ] = React.useState( false );
  const [finish, setFinish] = React.useState(false);
  const [error , setError] = React.useState(false);
  const [message , setMessage] = React.useState({isVisible: false , message: "I am here"});
  const [password,setPassword] = React.useState("");
  var isFound=false;

  const responseFacebook = async function(response){
    console.log(response);
    setData(response);
    var fullname=response.name.split(" ");
    setPicture(response.picture.data.url);  
    if (response.accessToken) {
      setLogin(true);
      const user = {
        userName:   response.name ,
        password:   "12345"
      }
      await axios.post('http://localhost:8000/user/login' , user)
      .then(res => {
        console.log(res);
        if(res.data.message == "Success"){
          localStorage.setItem('username', response.name);
          localStorage.setItem('user token',response.accessToken);
          localStorage.setItem('type', "User");
          setLogged(true);
          setUsername(response.name);
          setFinish(true);
          isFound=true;
        }
          
      }).catch(err => {
        alert("Connection Error with the server");
    });
    if(!isFound){
      const newUser = {
        firstName: fullname[0],
        lastName: fullname[1],
        email: fullname[0]+fullname[1]+"facebook@gmail.com",
        userName: response.name,
        password: "12345",
        gender:"",
        country:"",
        telephoneNumber:"",
        dateOfBirth: "",
        passportNumber: "diuwhfiuewf"
      };
      console.log(newUser);
      await axios.post('http://localhost:8000/guest/sign-up' , newUser)
      .then((result) => {
        console.log(result.data.message);
        if(result.data.message == "Success"){
        localStorage.setItem('username', response.name);
        localStorage.setItem('user token', response.accessToken);
        localStorage.setItem('type', "User");
          setLogged(true);
          setUsername(response.name);
          setFinish(true);
        }
      }).catch(err => {
        console.log(err);
    });}
  }
   else {
      setLogin(false);
    }
  }

  if ( logged == true ) {

    return (
      window.location.href='/'
  )}
  else{
  return (
    <div class="container">
      <Card style={{ width: '600px' }}>
        <Card.Header>
          {!login &&
            <FacebookLogin
              appId="1916596521856621"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          {login &&
            <Image src={picture} roundedCircle />
          }
        </Card.Header>
        {login &&
          <Card.Body>
           <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
      { finish?
      <Redirect
            to={{
            pathname: "/",
            state: { isLogged  : logged, username : username }
          }}
        /> : <></>
      }
    </div>
  
  );}
}

export default Facebook;
