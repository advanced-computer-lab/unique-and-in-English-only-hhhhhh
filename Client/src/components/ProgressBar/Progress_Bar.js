import React from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Button } from '@mui/material';



const Progress_Bar = (props) => {
   const [ per , setPer ] = React.useState(props.percent);
      React.useEffect(()=>{
        setPer(props.percent);
      },[props.percent])
    return (
        <>
        <ProgressBar
          
          percent={per}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
          hasStepZero = {true}
          height = {20}
          width = {"90%" }
          
        >
          <Step transition="scale" >
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`  ,  borderRadius: 100}}
                width="50"
                src= 'https://is3-ssl.mzstatic.com/image/thumb/Purple125/v4/1c/17/2b/1c172b9b-9fa6-2c71-b803-e744a036331d/source/512x512bb.jpg'
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` ,  borderRadius:100 , transform: "rotate(180deg)" }}
                width="50"
                src="https://is3-ssl.mzstatic.com/image/thumb/Purple125/v4/1c/17/2b/1c172b9b-9fa6-2c71-b803-e744a036331d/source/512x512bb.jpg"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` ,  borderRadius:100  , marginLeft:0}}
                width="50"
                src="https://www.kindpng.com/picc/m/11-115502_dollar-sign-icon-png-yellow-dollar-sign-youtube.png"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                width="30"
                src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
              />

            )}
          </Step>
        </ProgressBar>
        </>
      );
}

export default Progress_Bar
