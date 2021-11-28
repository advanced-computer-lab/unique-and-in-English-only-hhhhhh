import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlightIcon from '@mui/icons-material/Flight';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import LuggageIcon from '@mui/icons-material/Luggage';

const UserSearchFlight = () => {
    return (
        
           
        <div className="mx-32 mb-6 w-5/6">
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
             <img className="rounded-full w-36 h-16 mr-5" src="https://media.istockphoto.com/photos/commercial-jet-flying-over-clouds-picture-id155380716?b=1&k=20&m=155380716&s=170667a&w=0&h=LjalFiyrKtBye-26dufNMHkbU_k_KrJ1-UYnbTpaxtM=" />
            <div className=" w-full justify-center">
            <div className=" flex justify-between justify-items-center">
                  <Typography  variant="h4">
              HH:MM
            </Typography>
             <SendIcon sx={{fontSize:40}}/>             
            <Typography  variant="h4">
            HH:MM
            </Typography>     
            </div>

            <div className=" flex justify-between justify-items-center mb-6">
            <Typography gutterBottom variant="caption" color="text.secondary">
            City 1
            </Typography>
            <Typography gutterBottom variant="caption" color="text.secondary">
            Flight duration
            </Typography>
            <Typography gutterBottom variant="caption" color="text.secondary">
            City 2
            </Typography>
            </div>
            </div>
        </AccordionSummary>
        
        <AccordionDetails>
            <div>
            <Typography sx={{marginBottom: 2}}>
            <FlightIcon /> Flight Number
          </Typography>
        <div className="flex justify-evenly">
          <Typography>
          <EventIcon/> Outbound Date
          </Typography>
           <Typography>
          <ClassRoundedIcon /> Class
          </Typography>
          </div>
          <div className="flex justify-evenly">
          <Typography>
          <EventIcon/> Arrival Date
          </Typography>
          <Typography>
          <AttachMoneyIcon/> price
          </Typography>
          </div>
          <Typography>
          <LuggageIcon /> Baggage Allowance
          </Typography>
          <div className="flex justify-end">
          <Button endIcon={<EditIcon />} size="large">Reserve</Button>
          </div>
          </div>
        </AccordionDetails>
      </Accordion>

     
      
        </div>
    )
}

export default UserSearchFlight
