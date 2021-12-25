import React from 'react'
import { Button, InputLabel, MenuItem, Radio, RadioGroup , Select, Typography , TextField} from '@mui/material'
import Showcase from '../Showcase'
import Notification from '../Notification'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UserSearchFlight from '../UserSearchFlight'
import { Box } from '@mui/system'



const EditLargeReservation =  (props) => {
    const [ flights , setFlights ] = React.useState([]);
    const [successfulSearch , setSuccessfulSearch] = React.useState(false);
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
    const [cabin, setCabin] = React.useState(props.cabinClass);
    const [Id,setId] = React.useState(props._id);
    const [ seats , setSeats] = React.useState('');
    const [ price , setPrice] = React.useState(0);
    const [ type , setType ] = React.useState ( props.type);
    const [image_url_dep , setImage_url_dep] = React.useState('');
    const [image_url_arr , setImage_url_arr] = React.useState('');
    const [terminateUseEffect , setTerminateUseEffect] = React.useState(false);
    const [ chairNumber , setChairNumber ] = React.useState(1);
    const [ credit , setCredit ] = React.useState( true ); 

    const handleChange = (event) => {
        setCabin(event.target.value);
        console.log( cabin );
    };
    
React.useEffect( async () => {
    const flight = {
        departureAirportTerminal: props.departure,
        arrivalAirportTerminal: props.return,
        adults: 1,
        children: 0,
        class: cabin,
        departureDate: new Date(props.departureDate),
        returnDate:  new Date(props.returnDate)
      }

      console.log( flight );
      
    
      await axios.post('http://localhost:8000/user/readReservation' , flight)
            .then((result) => {
              console.log(result.data.departureFlights);
              setFlights(result.data.departureFlights);
              setSuccessfulSearch(true);
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
          
} , [] );
React.useEffect( ()=> {
    getImage();
} , [successfulSearch]);

const getImage = async () => {
     const search_arr = {
        query : flights.length == 0 ? "" : (flights.filter(flight => flight._id != Id  ))[0].arrivalAirportTerminal
      };
      const search_dep = {
        query : flights.length == 0 ? "" : (flights.filter(flight => flight._id != Id  ))[0].departureAirportTerminal 
      };
          await axios.post("http://localhost:8000/user/searchImage" , search_dep)
          .then(res => {
            console.log(res.data.image_URL);
            setImage_url_dep(res.data.image_URL);
            }).catch(err => {
              console.log(err);
            });
      
            await axios.post("http://localhost:8000/user/searchImage" , search_arr)
          .then(res => {
            console.log(res.data.image_URL);
            setImage_url_arr(res.data.image_URL);
            }).catch(err => {
              console.log(err);
            });
}
   

React.useEffect( async()=>{
    if (!(seats === '') && !terminateUseEffect){
        const update = {
            _id: props.reservationId ,
            update: {
                departureFlightId:  type == "Departure Flight"? Id : "" , 
                departureSeats:type == "Departure Flight"? seats.split(',').map( item => item = parseInt(item)) : "" ,
                cabinClass: cabin,
                returnFlightId: type == "Departure Flight"? "" : Id ,
                returnSeats: type == "Departure Flight"? "" : seats.split(',').map( item => item = parseInt(item)),
            }
        }
        await axios.post( 'http://localhost:8000/user/updateReservation' , update).then( res => {
            console.log(res);
            alert("reservation edited");
          }).catch( err => {
            alert("reservation edited failed");
          });
          setTerminateUseEffect(true);
    }
} )
const triggerCredit = () => {
    props.showCredit( !credit); 
    setCredit( !credit);
}




    return (
        <>
        <div className='my-32'>

<div className='flex justify-center'>
                <Button 
                variant="contained"
                color="success"
                sx={{ marginX: 3}} 
                onClick={ triggerCredit }>
                    Confirm The Edit
                </Button>

                <Button variant="contained"  color="error" sx={{ marginX: 3}}>
                    Cancel
                </Button>
            </div>

            
<div className='flex justify-center my-12'>
<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="class">Class</InputLabel>
        <Select
        sx={{ width: 120 }}
        autoFocus
          labelId="class"
          id="class"
          value={cabin}
          label="CLASS"
          onChange={ e => {setCabin(e.target.value); console.log(cabin)} }
        >
          <MenuItem value={"economic"}>Economic</MenuItem>
          <MenuItem value={"business"}>Business</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <TextField
    sx={{ marginX: 3}}
                     inputProps= { {defaultValue:  chairNumber  } }
                  className="bg-white "
                  required                  
                  type="number"
                  id="chairNumber"                
                  label="Number Of Chairs"
                  name="chairNumber"
                  placeholder="Number of chairs count"
                  onChange={(event) =>{
                    if (event.target.value < 0){
                      event.target.value = 0
                    }
                    else if (event.target.value > 500){
                      event.target.value = 500
                    }
                    setChairNumber(event.target.value)
                }
              }
                />
            </div>

            <div className='flex w-full justify-between h-full'>


                <div className='w-2/3'>
                {  successfulSearch ? (flights.filter(flight => flight._id != Id  )).map((oneElement) =>
    <UserSearchFlight
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
   Class = {cabin} 
   maxNumber = {chairNumber}
   setId = { setId }
   setSeats = { setSeats }
   setPrice = { setPrice }
   dep_img_url= {image_url_dep}
   arr_img_url= {image_url_arr}
   itsEdit = { true }
   />
    ) : <></>  }
                </div>

                <div className='w-1/4'>
                <Typography> Departure : {props.departure}  </Typography>
                <Typography> Return : {props.return} </Typography>
                <Typography> Departure Date :  {(props.departureDate).substring(0, 10)} </Typography>
                <Typography> Return Date :  {(props.returnDate).substring(0, 10)} </Typography>
                <Typography> Cabine Class : {cabin.toUpperCase()} </Typography>
                
                </div>


            </div>
        </div>
        <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default EditLargeReservation
