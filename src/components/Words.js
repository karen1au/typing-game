import React, { useState, useContext } from "react";

import GameContext from "../game-context";
import WordsContext from "../words-context";

const Words = props => {
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  const { gameDone } = useContext(GameContext);
  const { words, setWords } = useContext(WordsContext);

  const userInputHandler = e => {
    setUserInput(e.target.value);
    //when user get the right word
    if (e.target.value === words[0]) {
      setUserInput("");
      const newWord = [...words];
      newWord.shift();
      setWords(newWord);
      setScore(score + 1);
    }
  };

  let inputClass = "user-input";

  if (props.dark) {
    inputClass = "user-input-dark";
  }

  return (
    <div className="word-container">
      {gameDone ? (
        <div className="endgame">
          <h1>Time's Up</h1>
          <h2>Your score is</h2>
          <h2 className="score">{score}</h2>
        </div>
      ) : (
        <div>
          <h3>{words[0]}</h3>
          <input
            className={inputClass}
            type="text"
            value={userInput}
            onChange={userInputHandler}
          />
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Words;
