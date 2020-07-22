import React from 'react'

export default function TimeContainer(props) {
    return (
        <div id="timeContainer">
            <p id='timer-label'>Currently Active: {props.mode}</p>
            <span id="time-left" className={!props.active ? "" : props.mode === 'Work' ? "activeTime" : "breakTime"}>{props.activeMinute}:{props.activeSecond === 0 ? '00' : props.activeSecond < 10 ? `0${props.activeSecond}` : props.activeSecond}</span>
            <button id="start_stop" onClick={() => props.setActive(props.active ? false : true)}><span>{props.active ? 'Pause' : 'Start'}</span></button>


            <div id='buttonContainer'>

                <button id="reset" onClick={props.resetTimer} disabled={props.active}>Reset</button>
                <button id='switch_mode' onClick={() => props.changeMode()} disabled={props.active}>Change Mode</button>
            </div>


            <audio id='timerDing' preload="auto" src="http://michaelboro.tech/media/timertone.mp3"></audio>
        </div>
    )
}
