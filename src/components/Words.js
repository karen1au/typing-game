import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GameContext from "../game-context";
import ErrContext from "../err-context";
import LoadingContext from "../loading-context";

const Words = props => {
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);

  const { gameDone } = useContext(GameContext);
  const { err, setErr } = useContext(ErrContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?key=XXLQCDBL&number=150")
      .then(res => {
        setWords(res.data);
        setLoading(false);
      })
      .catch(err => setErr(true));
  }, [gameDone]);

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

  let word = null
  if (loading) {
    word = (<div className="word-box"><div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div></div>)
    // word = <h3>loading...</h3>
  } else {
    word = (<div className="word-box"><h3>{words[0]}</h3></div>)
  }

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
          {word}
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
