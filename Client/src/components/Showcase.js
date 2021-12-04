import React from 'react'
import Grow from '@mui/material/Grow';
import UserSearch from './UserSearch';


const Showcase = () => {
    const isReloaded = true ;
    return (
<><Grow in={ isReloaded } timeout={3000}> 
<div>

       <section className="showcase">
       
           <div className="overlay">
               <h1 style={{fontFamily: 'Bebas Neue, cursive'}}> Zeyad Tayara Travel Agency</h1>
                <p style={{fontFamily: 'Yellowtail, cursive'}}>
                    Travel the World Now!!
                </p>
           </div>
           
       </section>
       <div className="ml-32 -mt-60">
       <UserSearch />
       </div>
       </div>

          </Grow>
      </> 
    )
}

export default Showcase ;

