import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import FlightCard from './FlightCard'
import SearchBox from './SearchBox'
import ConfirmDialog from './ConfirmDialog'
import Notification from './Notification'


const Combine = () => {
    var [deleteFlag , setDeleteFlag] = React.useState(false);
    const [flag , setFlag] = React.useState(true);
    const [allState , setAllState] = React.useState([]);
    const [temp , setTemp] = React.useState([]);
    const [deleted , setDeleted] = React.useState("");
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [state , setState] = React.useState({
      flightNumber:'',
      ecoSeatsCount:'',
      businessSeatsCount:'',
      departureDate:  '',
      arrivalDate:  '',
      departureAirportTerminal:'',
      arrivalAirportTerminal:'',
      });


      useEffect( async () => {
      if (flag) {
        await axios.get('http://localhost:8000/admin/readFlight')
        .then(result => {
          setAllState(result.data);
          console.log(allState);
        }).catch(err => {
          alert("Connection Error with the server  " + err);
      });
       setFlag(false);
      }
    } );

    
     
      const handleSerach = async (newValue) => {
        setState(newValue);
         await axios.post('http://localhost:8000/admin/readFlight' , state)
        .then((result) => {
          setAllState(result.data);
          console.log(allState);
        }).catch(err => {
          alert("Connection Error with the server  " + err);

      });
      } ;




      const handleDeleted = async ( newValue )=>{
         // setDeleted( newValue );
          setConfirmDialog({
            isOpen: true,
            title: 'Are you sure to delete this record?',
            subTitle: "You can't undo this operation",
            onConfirm: () => { onDelete(newValue) }
        })
      };

      const onDelete = async deleted => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        const deleteFlight = {
          flightNumber:deleted
        };


        await axios.post( 'http://localhost:8000/admin/deleteFlight' ,  deleteFlight )
        .then((result) => {
          setDeleteFlag(result.data);
          deleteFlag = result.data ;
        }).catch(err => {
          alert("Connection Error with the server  " + err);
      });
        if ( deleteFlag ){
          setTemp(allState);
          setTemp(  temp.filter( key => key.flightNumber != deleted )  );
          setAllState( temp );
          console.log(allState);
          setFlag(true);
          setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        }
        else {
          setNotify({
            isOpen: true,
            message: 'Deleted Failed',
            type: 'error'
        })
        }        
    }

    return (
        <div>
            <SearchBox Changedata={ (state) => handleSerach(state) }/>
            <Button onClick={e => {console.log(state)}} > click me</Button>

            <Grid 
       container
       display="flex"
       alignContent="center"
       alignItems="center"
       justifyContent = "center"
       wrap="wrap"
       padding= "120px"
       paddingLeft= "200px"
       spacing={15}
>
{ 
    allState.map((oneElement) =>
    <Grid key={oneElement.flightNumber}  item xs={4} sx={{minWidth: "450px"}}>

    <FlightCard  flightNumber={oneElement.flightNumber}
   departureDate ={oneElement.departureDate}
   arrivalDate ={oneElement.arrivalDate}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   ecoSeatsCount = {oneElement.ecoSeatsCount}
   businessSeatsCount=  {oneElement.ecoSeatsCount}
   DeleteData={ (deleted) => handleDeleted(deleted) }
   />
    </Grid>


 )}
</Grid>


<Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </div>
    )
}

export default Combine
