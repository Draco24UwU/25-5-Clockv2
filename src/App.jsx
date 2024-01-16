import { useState} from 'react'
import './App.css'
import { FaArrowDown, FaArrowUp} from "react-icons/fa";
import {Timer} from "./Components/Timer"

// Constantes de tiempo en segundos
const defaultBreak = 60 * 5;
const defaultSesion = 60 * 25;
const min = 60;
const max = 3600;


function App() {

  const [breakTime, setbreakTime] = useState(defaultBreak);
  const [sessionTime, setsessionTime] = useState(defaultSesion);
  

  return (
    <>

      <div className='timer'>
        <h1>25 + 5 Clock</h1>

        <div className='times'>
          
          <div className='break'>
            <h2>Break Length</h2>
            <div className='content'>
              <button onClick={() => {if(breakTime > min){setbreakTime(breakTime - 60)}}}><FaArrowDown size={30}></FaArrowDown></button>
              <h2 id='breakValue'>{breakTime/60}</h2>
              <button onClick={() => {if(breakTime < max){setbreakTime(breakTime + 60)}}}><FaArrowUp size={30}></FaArrowUp></button>
            </div>

          </div>

          <div className='session'>
            <h2>Session Length</h2>
            <div className='content'>
              <button onClick={() => {if(sessionTime > min){setsessionTime(sessionTime - 60)}}}><FaArrowDown size={30}></FaArrowDown></button>
              <h2 id='sessionValue'>{sessionTime/60}</h2>
              <button onClick={() => {if(sessionTime < max){setsessionTime(sessionTime + 60)}}}><FaArrowUp size={30}></FaArrowUp></button>
            </div>

          </div>
        </div>
        
        <div className='display'>
          <div id='sessionDisplay'><Timer time = {sessionTime} breakTime = {breakTime} ></Timer></div>
        </div>

        <h4><code>Code by Gael Rivera Garcia</code></h4>

      </div>

    </>
  )
}

export default App
