import React from 'react'

function Player(props){
    return (
        <div className={props.className}>
            <p className="player-name">{props.playerName}</p>
            <p className="scoreLabel">Score</p>
            <p className="score">{props.score}</p>
        </div>
    )
}

export default Player