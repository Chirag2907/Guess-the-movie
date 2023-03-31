import React from 'react'
import { useState, useEffect } from 'react'

const Timer = (props) => {
    const [Time, setTime] = useState(300);
    // if(props.func2)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Time - 1);
            props.func(Time);
        }, 1000);
        if (Time === 0) {
            // clearInterval(interval);
            // props.func(0);
            // console.log("first")
        }
        return () => clearInterval(interval);
    }, [Time, props]);
    //reload this component when a button is clicked in the parent component
    



  return (
    <div>
        <div className='time'>Time left: {Time} {Time===1? <>second</>:<>seconds</>}</div>
    </div>
  )
}

export default Timer