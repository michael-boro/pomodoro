import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState('Session');
  const [activeMinute, setActiveMinute] = useState(25);
  const [activeSecond, setActiveSecond] = useState(0);


  const resetTimer = () => {
    setSessionTime(25);
    setBreakTime(5);
    setActive(false);
    setMode('Session');
    setActiveMinute(25);
    setActiveSecond(0);
  }

  const updateSession = (type) => {
    if (active) return;

    if (type === 'up') {
      if (sessionTime === 60) return;
      setSessionTime(sessionTime + 1);
      if (mode === 'Session') {
        setActiveMinute(sessionTime + 1);
      }
    } else {
      if (sessionTime === 1) return;
      setSessionTime(sessionTime - 1);
      if (mode === 'Session') {
        setActiveMinute(sessionTime - 1);
      }
    }
  }

  const updateBreak = (type) => {
    if (active) return;

    if (type === 'up') {
      if (breakTime === 60) return;
      setBreakTime(breakTime + 1);
      if (mode === 'Break') {
        setActiveMinute(breakTime + 1);
      }
    } else {
      if (breakTime === 1) return;
      setBreakTime(breakTime - 1);
      if (mode === 'Break') {
        setActiveMinute(breakTime - 1);
      }
    }
  }

  const changeMode = () => {
    if (active) return;
    if (mode === 'Session') {
      setMode('Break');
      setActiveMinute(breakTime);
      setActiveSecond(0);
    } else {
      setMode('Session');
      setActiveMinute(sessionTime);
      setActiveSecond(0);
    }
  }

  useEffect(() => {

    const timer = setInterval(() => {

      if (activeMinute === 0 && activeSecond === 0 && mode === 'Session') {
        setMode('Break');
        setActiveMinute(breakTime);
        setActiveSecond(0);
        console.log('session done');
        const sound = document.getElementById('timerDing');
        sound.play();
        // setActive(false);
      }

      if (activeMinute === 0 && activeSecond === 0 && mode === 'Break') {
        setMode('Session');
        setActiveMinute(sessionTime);
        setActiveSecond(0);
        const sound = document.getElementById('timerDing');
        sound.play();
      }

      if (active && activeSecond > 0) {
        setActiveSecond(activeSecond - 1);
      }

      else if (active && activeMinute > 0) {
        setActiveMinute(activeMinute - 1);
        setActiveSecond(59)

      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })






  return (
    <div className="App">
      <h1>A React Pomodoro App!</h1>
      <div id='sessionTimeContainer'>
        <p id='session-label'>Session Timer</p>
        <button className="plusButton" id='session-increment' onClick={() => updateSession('up')}>+</button>
        <span className="timeLabel" id='session-length'>{sessionTime}</span>
        <button className="minusButton" id='session-decrement' onClick={() => updateSession('down')}>-</button>
      </div>

      <div id='breakTimeContainer'>
        <p id='break-label'>Break Timer</p>
        <button className="plusButton" id='break-increment' onClick={() => updateBreak('up')}>+</button>
        <span className="timeLabel" id='break-length'>{breakTime}</span>
        <button className="minusButton" id='break-decrement' onClick={() => updateBreak('down')}>-</button>
      </div>

      <div id='timeContainer'>
        <p id='timer-label'>Currently Active: {mode}</p>
        <span id="time-left">{activeMinute}:{activeSecond === 0 ? '00' : activeSecond < 10 ? `0${activeSecond}` : activeSecond}</span>
        <span id='timeStatus'>Status: {active ? 'Active' : 'Not Active'}</span>

        <div id='buttonContainer'>
          <button id="start_stop" onClick={() => setActive(active ? false : true)}>{active ? 'Pause' : 'Start'}</button>
          <button id="reset" onClick={resetTimer}>Reset</button>
        </div>

        <button id='switch_mode' onClick={() => changeMode()}>Change Mode</button>
        <audio id='timerDing' preload="auto" src="http://michaelboro.tech/media/timertone.mp3"></audio>
      </div>
    </div>
  );
}

export default App;
