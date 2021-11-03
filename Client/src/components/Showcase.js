import React from 'react'
import Grow from '@mui/material/Grow';


const Showcase = (props) => {
    const isReloaded = true ;
    return (
<><Grow in={ isReloaded } timeout={3000}> 
       <section className="showcase">
       
           <div className="overlay">
               <h1> LOL Agency</h1>
                <p>
                    Travel the World Now!!
                </p>
           </div>
           
       </section>
          </Grow>
      </> 
    )
}

export default Showcase ;

