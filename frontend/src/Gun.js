import React from 'react'

function Gun(props){
    const deg='rotate('+props.angle+'deg)'
    return (
        <div className='gun' style={{transform: deg, left: props.leftPos}}>
        </div>
    )
}

export default Gun