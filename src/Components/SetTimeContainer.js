import React from 'react'

export default function SetTimeContainer(props) {
    return (
        <div id={props.boxId} className="setTimeContainer">
            <p id='session-label' className='timeLabel'>{props.label}</p>
            <button className="timeButton plusButton" id='session-increment' onClick={() => props.updateFunc('up')}>+</button>
            <span className="timeCount" id='session-length'>{props.time}</span>
            <button className="timeButton minusButton" id='session-decrement' onClick={() => props.updateFunc('down')}>-</button>
        </div>
    )
}
