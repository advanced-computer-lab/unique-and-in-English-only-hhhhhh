import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { IconButton, Modal } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import Notification from './Notification'
import { AlertTitle } from '@mui/material';

const CreateFlightV2 = () => {
    return (
        <div className="inline-grid bg-red-500 mt-32 rounded-xl ">
       
            <div className="justify-items-center p-10  rounded-xl inline-grid lg:grid-cols-4 sm:grid-cols-1 gap-x-1 gap-y-3">   
            <TextField
                  className="bg-white"
                  required
                  fullWidth
                  id="flightNumber"
                  label="Flight Number"
                  name="flightNumber"
                  placeholder="EX. PI 150"
                  inputProps={{ maxLength: 7 }}
                  autoFocus
                />
      
        <div className="flex items-stretch">
                <TextField
                className="bg-white"
                  name="departureAirportTerminal"
                  required
                  fullWidth
                  id="departureAirportTerminal"
                  label="From"
                  placeholder="The Airport Name"
                  autoFocus
                />
     
   
                <TextField
                className="bg-white"
                  required
                  fullWidth
                  id="arrivalAirportTerminal"
                  label="To"
                  name="arrivalAirportTerminal"
                  placeholder="The Airport Name"
                />
      
      </div>
      <div className="flex items-stretch">
                <TextField
                className="bg-white"
                  name="businessSeatsCount"
                  required
                  fullWidth
                  type="number"
                  id="businessSeatsCount"
                  label="Business Seats"
                  placeholder="Number of Seats"
                  onInput={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 100){
                      event.target.value = 100
                    }
                } 
              }
                />
     
          
                <TextField
                className="bg-white"
                  required
                  fullWidth
                  type="number"
                  id="ecoSeatsCount"
                 
                  label="Economic Seats"
                  name="ecoSeatsCount"
                  placeholder="Number of Seats"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 500){
                      event.target.value = 500
                    }
                   
                }
              }
                />
                </div>
                 
       <div className="flex items-stretch col-spin-3">

      
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                className="bg-white"
                     id = 'departureDate'
                     name = "departureDate"
                     label="Date&Time of Depature"
                     disablePast
                     
                    
                     renderInput={(params) => <TextField {...params} />}
                     
        />
        </LocalizationProvider>
         
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                     className="bg-white"
                     id = "arrivalDate"
                     name = "arrivalDate"
                     label="Date&Time of Arrival"
                     disablePast
                    
                     renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                    </div>
                    </div>


                 
            <Button
            className="bg-white"
              type="submit"
              fullWidth
              endIcon= {<NoteAddIcon  />}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
           
         


            

            
            </div>
            
           


 
    )
}

export default CreateFlightV2
