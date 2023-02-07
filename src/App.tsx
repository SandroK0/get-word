import React from "react";
import "./App.css";
import { wordsArray } from "./data/words";
import { useState,useEffect } from "react";
import { time } from "console";

function App() {
  
  const [current, setCurrent] = useState<string>(
    wordsArray[Math.floor(Math.random() * wordsArray.length)]
  );
  const [value, setValue] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [gameStatus, setGameStatus] = useState<boolean>(false);

  if (current.toUpperCase() === value.toUpperCase()){
    setScore(score + 1)
    setCurrent(wordsArray[Math.floor(Math.random() * wordsArray.length)])
    setValue('')
  }

  useEffect(() => {
    let interval:any
    if (gameStatus) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer <= 0) {
      clearInterval(interval);
      
    }
    return () => clearInterval(interval);
  }, [gameStatus, timer]);


  return (
    <div className="App">
      <header>GetWord</header>
      <div className="gameInfo">
        <h1>{timer > 0 ? `time :${timer}`: "Time's up!"}</h1>
        <h1>score: {score}</h1>
      </div>
      <div className="gameContainer">
       
        <label className="word">{current}</label>
        <input
          className="input"
          placeholder={gameStatus === false? "type to start game" : ''}
          value={value}
          onChange={(event) => {
            if (timer > 0){
              setValue(event.target.value);
              setGameStatus(true)
            }else{
              setGameStatus(false)
            }
            
            
          }}
        ></input>
        <button className="restartBtn" onClick={() => {
          setValue('')
          setTimer(60)
          setScore(0)
        }}>Reset</button>
      </div>
    </div>
  );
}

export default App;
