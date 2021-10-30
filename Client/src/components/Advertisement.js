import React from 'react'
import { Slide } from '@mui/material'
import VizSensor from 'react-visibility-sensor'; 
import ready from '../assets/ready.svg'
import keep from '../assets/keep.svg'
import plan from '../assets/plan.svg'


const Advertisement = () => {
    let [active, setActive] = React.useState(false);

    return (
       <>
       <VizSensor
            onChange={(isVisible) => {
                if (isVisible){
                setActive(isVisible);
            }
            }}
        >
       
       <section className="grid">
            <h3>
                Why Do You Choose Us?!
            </h3>

            <Slide direction="left" in={active} mountOnEnter unmountOnExit timeout={2000}>
  

            <div className="grid-items">
                <div>
                    <img src={ready} alt="" />
                    <h4>I am ready</h4>
                    <p>
                    See where you can travel to right now and find the best deals across thousands of flights, hotels and car hire options
                    </p>
                </div>

                <div>
                <img src={keep} alt="" />
                    <h4>Keep it simple</h4>
                    <p>
                    No hidden fees. No hidden charges. No funny business. With us, you’ll always know exactly where your money goes. So you can relax before your trip even begins.
                    </p>
                </div>

                <div>
                <img src={plan} alt="" />
                    <h4>Plan with confidence</h4>
                    <p>
                    Stay one step ahead with flexible flight tickets, free hotel and car cancellation and the cleanest rooms around.
                    </p>
                </div>
            </div>
 </Slide>

           

           
        </section>
       </VizSensor>
       
       </>
    )
}

export default Advertisement
