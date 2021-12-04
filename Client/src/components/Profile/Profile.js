import axios from 'axios';
import React, { useEffect } from 'react'
import Navbar from './Navbar'


const Profile = () => {
    const [ user , setUser ] = React.useState();
    const [arrivedData , setArrivedData] = React.useState( false )


    useEffect( async () => {

            const username = { 
                userName : 'konar'
            };

          await axios.post('http://localhost:8000/user/viewUserInfo' , username)
          .then(result => {
            console.log( result.data );
            setUser(result.data);
          }).catch(err => {
            alert("Connection Error with the server  " + err);
        });
        setArrivedData(true);
      } , [] );



    return (
        <div>
            {
                arrivedData ?
                <Navbar user= {user}  />
                : <> </> 
            }
          
        </div>
    )
}

export default Profile
