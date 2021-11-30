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


    const [ _id , setId ] = React.useState('');
    const [ flightNumber , setFlightNumber ]= React.useState('');
    const [ ecoSeatsCount , setEcoSeatsCount ]= React.useState('');
    const [ businessSeatsCount , setBusinessSeatsCount ]= React.useState('');
    const [departureDate, setDepartureDate] = React.useState( '' );
    const [arrivalDate, setarrivalDate] = React.useState( '' );
    const [ departureAirportTerminal , setDepartureAirportTerminal ]= React.useState('');
    const [ arrivalAirportTerminal , setArrivalAirportTerminal ]= React.useState('');
    const [ economicSeatPrice , setEconomicSeatPrice ]= React.useState('');
    const [ businessSeatPrice , setBusinessSeatPrice ]= React.useState('');

    const [state , setState] = React.useState({
      _id: '',
      flightNumber:'',
      ecoSeatsCount:'',
      businessSeatsCount:'',
      departureDate:  '',
      arrivalDate:  '',
      departureAirportTerminal:'',
      arrivalAirportTerminal:'',
      economicSeatPrice:'',
      businessSeatPrice:''
      });


      useEffect( async () => {
      if (flag) {
        await axios.get('http://localhost:8000/admin/readFlight')
        .then(result => {
          console.log( result);
          setAllState(result.data);
        }).catch(err => {
          alert("Connection Error with the server  " + err);
      });
       setFlag(false);
      }
    } );

    
     
      const handleSerach = async (newValue) => {
        console.log(newValue);
         await axios.post('http://localhost:8000/admin/readFlight' , newValue)
        .then((result) => {
          console.log(result.data);
          setAllState(result.data);
          setNotify({
            isOpen: true,
            message: 'Search Successfully',
            type: 'success'
        });
        }).catch(err => {
          
          setNotify({
            isOpen: true,
            message: 'Search Failed',
            type: 'error'
        })
          

      });
      console.log(test);
      } ;




      const handleDeleted = async ( newValue )=>{
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
          _id:deleted
        };
        console.log(deleted);


        await axios.post( 'http://localhost:8000/admin/deleteFlight' ,  deleteFlight )
        .then((result) => {
          setDeleteFlag(result.data);
          deleteFlag = result.data ;
        }).catch(err => {
          setNotify({
            isOpen: true,
            message: 'Deleted Failed',
            type: 'error'
        });
      });
        if ( deleteFlag ){
          setTemp(allState);
          setTemp(  temp.filter( key => key.flightNumber != deleted )  );
          setAllState( temp );
          setFlag(true);
          setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'success'
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

    <FlightCard
   _id = {oneElement._id}
   flightNumber={oneElement.flightNumber}
   departureDate ={oneElement.departureDate}
   arrivalDate ={oneElement.arrivalDate}
   departureAirportTerminal ={oneElement.departureAirportTerminal}
   arrivalAirportTerminal = {oneElement.arrivalAirportTerminal}
   ecoSeatsCount = {oneElement.ecoSeatsCount}
   businessSeatsCount=  {oneElement.businessSeatsCount}
   economicSeatPrice= { oneElement.economicSeatPrice}
   businessSeatPrice= { oneElement.businessSeatPrice}
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
