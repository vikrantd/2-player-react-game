import React from 'react'

function Pilot(props){
    const position=props.position+'px'
    const depth=props.depth+'px'
    return (
        <div className='pilot' style={{left: position, top: depth}}>
        </div>
    )
}

export default Pilot