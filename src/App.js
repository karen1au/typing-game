import React, { useState, useEffect } from "react";
import "./App.css";


import Words from "./components/Words";
import Timer from "./components/Timer";
import GameContext from "./game-context";
import LoadingContext from "./loading-context";
import ErrContext from "./err-context";

function App() {
  const [gameStart, setGame] = useState(false);
  const [gameDone, setGameDone] = useState(false);
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);



  //click start
  const gameHandler = () => {
    setGame(true);
    setGameDone(false);
    setLoading(true);
  };

  //click stop
  const stopGameHandler = () => {
    setGame(false);
    setGameDone(true);
  };

  //click reset
  const resetGameHandler = () => {
    setGameDone(!gameDone);
    setGame(!gameStart);
  };

  const darkHandler = event => {
    setDark(event.target.checked)
    console.log(event.target.checked)
  }

  let button = null;
  if (gameDone) {
    button = <button onClick={resetGameHandler}>Restart</button>;
  } else {
    button = <button onClick={stopGameHandler}>Stop</button>;
  }

  let content = null;
  if (err) {
    content = <h1 className="err">Please try again later...</h1>;
  } else {
    content = (
      <div>
        <Timer />
        {/* <WordsContext.Provider value={{ words, setWords }}> */}
          <Words dark={dark}/>
        {/* </WordsContext.Provider> */}
        {button}
      </div>
    );
  }

  return (
    <div className="App">
      <LoadingContext.Provider value={{ loading, setLoading }}>
      <ErrContext.Provider value={{ err, setErr }}>
      <GameContext.Provider value={{ gameDone, setGameDone }}>
        {gameStart ? (
          <div className="game-container">{content}</div>
        ) : (
          <div className="welcome">
            <h1>Welcome</h1>
            <h3 className="welcome-line">This is just a typical game</h3>
            <button className="start" onClick={gameHandler}>
              START
            </button>
            <div className="dark-switch-box">
            <span>go dark?</span>
            <label className="switch">
            <input type="checkbox" checked={dark} onChange={darkHandler}/>
            <span className="slider"></span>
            </label>
            </div>
          </div>
        )}
      </GameContext.Provider>
      </ErrContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
