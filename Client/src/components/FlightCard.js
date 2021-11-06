import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSpring, animated, to } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './FlightCardStyles.css'
import { Modal } from '@mui/material';
import EditFlight from './EditFlight';
import { Backdrop } from '@mui/material';
import { Fade } from '@mui/material';
import { useState } from 'react';


const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20


const FlightCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)
    
        return () => {
          document.removeEventListener('gesturestart', preventDefault)
          document.removeEventListener('gesturechange', preventDefault)
        }
      }, [])
      const domTarget = useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  )
  useGesture(
    {
     // onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } }
  )


    return (
          <div className={styles.container}>
            
      <animated.div
        ref={domTarget}
        className={styles.card}
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}>
        <Card >
          <CardMedia
            component="img"
            
            image="https://c.ndtvimg.com/2019-05/tk4tpt5g_plane-generic_625x300_29_May_19.jpg"
            alt="green iguana"
          />
          <CardContent sx={{textAlign:"center"}}>
            <Typography gutterBottom variant="h4" component="div">
            { props.flightNumber }
            </Typography>
            <Typography inline variant="h6">
            {props.departureAirportTerminal}  ------------{'>'}  {props.arrivalAirportTerminal}
            </Typography>
            <Typography inline variant="h6">
            {props.departureDate.getDate() + "/" + props.departureDate.getMonth()+'/'+props.departureDate.getFullYear()} -------{'>'} {props.arrivalDate.getDate() + "/" + props.arrivalDate.getMonth()+'/'+props.arrivalDate.getFullYear()}
            </Typography>
            <Typography inline variant="h6">
            {props.departureDate.getHours() + ":" + props.departureDate.getMinutes()} -------{'>'} {props.arrivalDate.getHours() + ":" + props.arrivalDate.getMinutes()}
            </Typography>
            
            
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between"  }}>
            <Button onClick={handleOpen} endIcon={<EditIcon />} size="small">Edit</Button>
                <EditFlight open={open} onClose={handleClose} />
            <Button endIcon={<DeleteIcon />} size="small">Delete</Button>
          </CardActions>
        </Card>

        </animated.div>
        

    </div>

    






        
        
      );
}

export default FlightCard
