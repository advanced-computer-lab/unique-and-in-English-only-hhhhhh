import React,{ useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import { Redirect } from 'react-router';

function Facebook() {
  const [username,setUsername] = React.useState("")
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [logged , setLogged ] = React.useState( false );
  const [finish, setFinish] = React.useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    console.log(response.name);
    setPicture(response.picture.data.url);

      localStorage.setItem('username', response.name);
      localStorage.setItem('user token', response.accessToken);
      localStorage.setItem('type', "User");
      setLogged(true);
      setUsername(response.name);
      window.setTimeout( () => {setFinish(true)}, 5000);
     
    if (response.accessToken) {
      setLogin(true);
    } else {
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
