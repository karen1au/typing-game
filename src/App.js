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

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?key=7ZQASGX2&number=150")
      .then(res => {
        // console.log(res.data)
        setWords(res.data);
      });
  }, [gameDone]);

  const gameHandler = () => {
    setGame(true);
    setGameDone(false);
  };

  const stopGameHandler = () => {
    setGame(false);
    setGameDone(true);
  };

  const resetGameHandler = () => {
    setGameDone(!gameDone);
    setGame(!gameStart);
  };
  return (
    <div className="App">
      <GameContext.Provider value={{ gameDone, setGameDone }}>
        {gameStart ? (
          <div>
            <Timer />
            <WordsContext.Provider value={{ words, setWords }}>
              <Words />
            </WordsContext.Provider>
            {gameDone ? (
              <button onClick={resetGameHandler}>Restart</button>
            ) : (
              <button onClick={stopGameHandler}>Stop</button>
            )}
          </div>
        ) : (
          <div className="welcome">
          <h1>Welcome</h1>
          <h3 className="welcome-line">This is just a typical game</h3>
          <button className="start" onClick={gameHandler}>START</button>
          </div>
        )}
      </GameContext.Provider>
    </div>
  );
}

export default App;
