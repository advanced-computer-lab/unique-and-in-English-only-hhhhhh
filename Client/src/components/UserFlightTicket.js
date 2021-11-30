import React, { useState, useCallback, CSSProperties, useEffect } from 'react'
import UserFlightCard from './UserFlightCard';
import styles from './styles.module.css'
import { Button } from '@mui/material';
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = [
    ({ style }) => <animated.div style={{ ...style,  }}>   <UserFlightCard/>   </animated.div>,
    ({ style }) => <animated.div style={{ ...style,  }}>  <UserFlightCard/>  </animated.div>,
  ]



const UserFlightTicket = () => {
    const [index, set] = useState(0)
    const onClick = useCallback(() => set(state => (state + 1) % 2), [])
    const transRef = useSpringRef()
    const transitions = useTransition(index, {
      ref: transRef,
      keys: null,
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    })
    useEffect(() => {
      transRef.start()
    }, [index])
    return (
        <>
      <div className={`flex fill ${styles.container}`} >
        {transitions((style, i) => {
          const Page = pages[i]
          return <Page style={style} />
        })}
      </div>
      <div className="">
      <Button  onClick={onClick}> Click Me </Button>
      </div>
      </>
    )
}

export default UserFlightTicket
