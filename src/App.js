import React, { useState, useEffect } from 'react';
import './App.scss';
import PomLogo from './PomLogo.svg';

import TimeContainer from './Components/TimeContainer';
import SetTimeContainer from './Components/SetTimeContainer';

function App() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState('Work');
  const [activeMinute, setActiveMinute] = useState(25);
  const [activeSecond, setActiveSecond] = useState(0);


  const resetTimer = () => {
    setWorkTime(25);
    setBreakTime(5);
    setActive(false);
    setMode('Work');
    setActiveMinute(25);
    setActiveSecond(0);
  }

  const updateWork = (type) => {
    if (active) return;

    if (type === 'up') {
      if (workTime === 60) return;
      setWorkTime(workTime + 1);
      if (mode === 'Work') {
        setActiveMinute(workTime + 1);
      }
    } else {
      if (workTime === 1) return;
      setWorkTime(workTime - 1);
      if (mode === 'Work') {
        setActiveMinute(workTime - 1);
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
    if (mode === 'Work') {
      setMode('Break');
      setActiveMinute(breakTime);
      setActiveSecond(0);
    } else {
      setMode('Work');
      setActiveMinute(workTime);
      setActiveSecond(0);
    }
  }

  useEffect(() => {

    const timer = setInterval(() => {

      if (activeMinute === 0 && activeSecond === 0 && mode === 'Work') {
        setMode('Break');
        setActiveMinute(breakTime);
        setActiveSecond(0);
        console.log('Work done');
        const sound = document.getElementById('timerDing');
        sound.play();
        // setActive(false);
      }

      if (activeMinute === 0 && activeSecond === 0 && mode === 'Break') {
        setMode('Work');
        setActiveMinute(workTime);
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
      <img src={PomLogo} alt="Site Logo" />

      <SetTimeContainer boxId="workTimeContainer" label="Work Length" updateFunc={updateWork} time={workTime} />

      <SetTimeContainer boxId="breakTimeContainer" label="Break Length" updateFunc={updateBreak} time={breakTime} />

      <TimeContainer mode={mode} activeSecond={activeSecond} activeMinute={activeMinute} active={active} setActive={setActive} changeMode={changeMode} resetTimer={resetTimer} />
    </div>
  );
}

export default App;
