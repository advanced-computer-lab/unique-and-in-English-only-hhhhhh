import React from 'react'
import { Link } from 'react-router-dom' ;
import { Avatar, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';


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
    children: `${name.split(' ')[0][0]}`,
  };
}

 const Header = (props) => {
const  isLogged = props.isLogged ;
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

if (!isLogged){
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

    <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar {...stringAvatar(  props.userName  )} />
          </IconButton>
        </Tooltip>

        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={event =>  window.location.href='/test3'}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={event =>  window.location.href='/search'} >
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          Search Flight
        </MenuItem>
        <MenuItem onClick={event =>  window.location.href='/createFlight'} >
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create Flight
        </MenuItem>
        
        <MenuItem onClick={event =>  window.location.href='/signup'}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    
    </header>
    )

}
  
}

export default Header ;

