import React from 'react'
import { Fade } from '@material-ui/core'
import  asia   from '../assets/sharmElSheikh.webp'
import  europ   from '../assets/europe.jpg'
import  hawaii   from '../assets/hawaii.jpg'
import italy from '../assets/italy.jpg'
import alps from '../assets/alps.jpg'
import VizSensor from 'react-visibility-sensor'; 





 const Destinations = () => {
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
                We are currently in 6 cuntries!
            </h3>
            <Fade in={active}  mountOnEnter unmountOnExit timeout={5000}>

            <div className="grid-items">
               
                <div>
                    <img src={asia} alt="" />
                    <h4>Fly to Asia</h4>
                    <p>
                    Artistic architecture combined with the beauty of the Adriatic sea!
                    </p>
                </div>
                

                
                <div>
                <img src={europ} alt="" />
                    <h4>Fly to Europe</h4>
                    <p>
                    Artistic architecture combined with the beauty of the Adriatic sea!
                    </p>
                </div>
                

                
                <div>
                <img src={hawaii} alt="" />
                    <h4>Yalla Hawaiiiiiii</h4>
                    <p>
                        Hawaiii ya gad3 :D
                    </p>
                </div>
                
               
                <div>
                <img src={italy} alt="" />
                    <h4>Wonders of Italy</h4>
                    <p>
                    Artistic architecture combined with the beauty of the Adriatic sea!
                    </p>
                </div>

                <div>
                <img src={alps} alt="" />
                    <h4>Pearls of the Alps</h4>
                    <p>
                    Travel amidst the most beautiful mountain landscapes in Switzerland and Austria!
                    </p>
                </div>



            </div>
 
            </Fade>
        </section>
        </VizSensor>
        </>
    )
}

export default Destinations;
