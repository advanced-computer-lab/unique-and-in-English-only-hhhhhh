import React from 'react'
import { Link } from 'react-router-dom' ;
import { Avatar, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

 const Header = (props) => {
const  isLogged = props.isLogged ;
if (isLogged){
  return (
    <header className='header' >
    <div>
    <Button endIcon={<HomeIcon />}  className="links" onClick={event =>  window.location.href='/'}>
       Home
     </Button>
    </div>

      <nav className="navbar">
        <ul>
          <Button endIcon={<LoginIcon />}  className="links" onClick={event =>  window.location.href='/login'}>Login</Button>
          <Button endIcon={<LockOpenIcon />} className="links" onClick={event =>  window.location.href='/signup'}>SignUP</Button>
          <Button endIcon={<SupervisorAccountIcon />} className="links" onClick={event =>  window.location.href='/admin'}>I'm an ADMIN</Button>
        </ul>
      </nav>
      
    </ header>
  )
}

else{
  return (
    <header className='header' >
    <div>
     <Link className="links" to="/">
       Home
     </Link>
    </div>


    <Avatar {...stringAvatar('Zeyad ElSaeed')} />
    </header>
    )

}
  
}

export default Header ;

