import React from "react"
import { useSelector } from "react-redux"

// Display message
export default function MessagePopup(props){
    const game = useSelector((state) => state.game)
    const {isRunning, gameOver} = game
    const classNam = isRunning && !gameOver ? 'message-popup hidden' : 'message-popup'
    let message =''

    if (gameOver){message = 'GameOver'}
    else if (!isRunning){message='Pause'}

    return (
        <div className= {classNam}>
            <h1>{message}</h1>
        </div>
    )
}