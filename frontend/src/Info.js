import React from 'react'

function Info(props){
    return (
        <div className="info">
            <p>Round 1 Over, PLease switch places</p>
            <button onClick={props.resume}>Resume</button>
        </div>
    )
}

export default Info