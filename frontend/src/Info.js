import React from 'react'

function Info(props){
    return (
        <div className="info" style={{display: props.isPaused ? 'block' : 'none'}}>
            {   (props.round === 1 && !props.isGameOver) && 
                <div>
                    <p>Foo Game</p>
                    <button onClick={props.resume}>Start Game</button>
                </div>
            }
            {   (props.round === 2 && !props.isGameOver) && 
                <div>
                    <p>Round 1 Over, PLease switch places</p>
                    <button onClick={props.resume}>Resume</button>
                </div>
            }
            {   (props.isGameOver) && 
                <div>
                    <p>Game Over</p>
                    <p>Player 1: {props.p1score}</p>
                    <p>Player 2: {props.p2score}</p>
                    <p>Player {props.p1score > props.p2score ? "1" : "2" } Wins</p>
                    <button onClick={props.restart}>Restart Game</button>
                </div>
            }   
        </div>
    )
}

export default Info