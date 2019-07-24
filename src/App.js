import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import Words from "./components/Words";
import Timer from "./components/Timer";
import GameContext from "./game-context";
import WordsContext from "./words-context";

function App() {
  const [gameStart, setGame] = useState(false);
  const [gameDone, setGameDone] = useState(false);
  const [words, setWords] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?key=7ZQASGX2&number=150")
      .then(res => {
        setWords(res.data);
        setLoading(false);
      })
      .catch(err => setErr(true));
  }, [gameDone]);

  //click start
  const gameHandler = () => {
    setGame(true);
    setGameDone(false);
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

  let button = null;
  if (gameDone) {
    button = <button onClick={resetGameHandler}>Restart</button>;
  } else {
    button = <button onClick={stopGameHandler}>Stop</button>;
  }

  let content = null;
  if (err) {
    content = <h1 className="err">Please try again later...</h1>;
  } else if (loading) {
    content = <h1 className="err">Loading...</h1>;
  } else {
    content = (
      <div>
        <Timer />
        <WordsContext.Provider value={{ words, setWords }}>
          <Words />
        </WordsContext.Provider>
        {button}
      </div>
    );
  }

  return (
    <div className="App">
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
          </div>
        )}
      </GameContext.Provider>
    </div>
  );
}

export default App;
