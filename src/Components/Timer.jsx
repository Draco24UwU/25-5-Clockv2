import {useState, useEffect, useRef} from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { VscDebugRestart } from "react-icons/vsc";
import audio from "../Audio/Alarm.mp3"

// eslint-disable-next-line react/prop-types
export const Timer = ({time, breakTime}) => {
    const [countdown, setcountdown] = useState(time);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [sessionTitle, setSessionTitle] = useState('Session');
    const [textColor, setcolor] = useState("white");

    
    const timerId = useRef();
    const copy1 = time;
    const copy2 = breakTime;

    const ConvertTime = (sec) => {
        let minuts = Math.floor(sec / 60);
        let rest = sec % 60;
        return minuts + ":" + (rest < 10 ? "0" : "") + rest;
    }

    const startTimer = () => {
        setIsTimerActive(true);
    };

    const endTimer = () => {
        setIsTimerActive(false)
    }

    const resetTime = () =>{

        if(sessionTitle === 'Session'){
            setcountdown(copy1);
        }
        else{
            setcountdown(copy2);
        }
        setIsTimerActive(false);
        
    }

    const change = (condition) =>{
        let paint;
        condition ? paint = { color:'black', transform: 'scale(1.5)'} : {color:'white'}
        return paint;
    }

    const change2 = (condition) =>{
        let paint;
        !condition ? paint = { color:'black', transform: 'scale(1.5)'} : {color:'white'}
        return paint;
    }


    useEffect(() => {
        if(sessionTitle == 'Session'){
            setcountdown(time);
        }else{
            setcountdown(breakTime);
        }
        setcolor("white");
        
    }, [time, breakTime, sessionTitle]);

    

    useEffect(() => {
        if(isTimerActive){
            timerId.current = setInterval(() =>{
                setcountdown(n => {
                    if(n <= 60){
                        setcolor("red");
                    }
                    else{
                        setcolor('white');
                    }

                    if (n > 0) {
                        return n - 1;
                    } 
                    else {
                        new Audio(audio).play()

                        if (sessionTitle == 'Session') {
                            setcountdown(breakTime);
                            setSessionTitle('Break');
                            setIsTimerActive(true);
                            
                        } else {
                            setcountdown(time);
                            setSessionTitle('Session');
                            setIsTimerActive(true);
                        }

                        return 0
                    }
                })
            }, 1000)
        }else {
            clearInterval(timerId.current);
        }
        return () => clearInterval(timerId.current)
    }, [breakTime, isTimerActive, sessionTitle, time])


  return (
    <>  
        <h2 style={{color: textColor, opacity: 0.8}}>{sessionTitle}</h2>
        <h1 style={{color: textColor, opacity: 0.8}}>{ConvertTime(countdown)}</h1>
        <div className='buttons'>
          <button onClick={()=> startTimer()}><CiPlay1 size={30} style={change(isTimerActive)}></CiPlay1></button>
          <button onClick={()=> endTimer()}><CiPause1 size={30} style={change2(isTimerActive)}></CiPause1></button>
          <button onClick={()=> resetTime()}><VscDebugRestart size={30} ></VscDebugRestart></button>
        </div>
    </>
  )
}
