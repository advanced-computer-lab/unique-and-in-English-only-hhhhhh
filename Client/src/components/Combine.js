import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import FlightCard from './FlightCard'
import SearchBox from './SearchBox'
import ConfirmDialog from './ConfirmDialog'
import Notification from './Notification'


const Combine = () => {
    const [deleteFlag , setDeleteFlag] = React.useState(false);
    const [flag , setFlag] = React.useState(true);
    const [allState , setAllState] = React.useState([]);
    const [temp , setTemp] = React.useState([]);
    const [deleted , setDelted] = React.useState("");
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
        .then((result) => {
          setAllState(result.data);
          console.log(allState);
        });
       setFlag(false);
       console.log(1);

      }
    } );
     
    
      const handleEdit = async (newValue) => {
        setState(newValue);
         await axios.post('http://localhost:8000/admin/readFlight' , state)
        .then((result) => {
          setAllState(result.data);
          console.log(allState);
        });
      } ;

      const handleDeleted = async ( newValue )=>{
        console.log(2);
          setDelted( newValue );
          console.log(deleted);
          setConfirmDialog({
            isOpen: true,
            title: 'Are you sure to delete this record?',
            subTitle: "You can't undo this operation",
            onConfirm: () => { onDelete(deleted) }
        })
      };

      const onDelete = async deleted => {
        console.log(3);

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        const deleteFlight = {
          flightNumber:deleted
        };
        console.log(deleteFlight)
        await axios.post( 'http://localhost:8000/admin/deleteFlight' ,  deleteFlight )
        .then((result) => {
          console.log(4);
          setDeleteFlag(result.data);
          console.log(deleteFlag);
        });
        if ( deleteFlag ){
          console.log(5);
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
            <SearchBox Changedata={ (state) => handleEdit(state) }/>
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
