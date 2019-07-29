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
  const { setErr } = useContext(ErrContext);
  const { loading, setLoading } = useContext(LoadingContext);


  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API)
      .then(res => {
        setWords(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setErr(true)
      });
  }, [gameDone]);

  const userInputHandler = e => {
    setUserInput(e.target.value);
    //normal mode
    if (!props.reversed && e.target.value === words[0]) {
      setUserInput("");
      const newWord = [...words];
      newWord.shift();
      setWords(newWord);
      setScore(score + 1);
    }
    //reversed mode
    if (props.reversed && e.target.value.split("").reverse().join("") === words[0]) {
      setUserInput("");
      const newWord = [...words];
      newWord.shift();
      setWords(newWord);
      setScore(score + 1);
    }
  };

  let word = null
  if (loading) {
    word = (<div className="word-box"><div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div></div>)
    // word = <h3>loading...</h3>
  } else {
    if (words.length < 1) {
      word = (<div className="word-box"><h3>No more words...</h3></div>)
    } else {
      word = (<div className="word-box"><h3>{words[0]}</h3></div>)
    }
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
