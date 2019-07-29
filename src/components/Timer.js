import React, { useState, useEffect, useContext } from "react";
import GameContext from "../game-context";
import LoadingContext from "../loading-context";

const Timer = props => {
  const [currentTime, setTimer] = useState(60);

  const { gameDone, setGameDone } = useContext(GameContext);
  const { loading } = useContext(LoadingContext);
  
  const timer = () => setTimer(currentTime - 1);
  
  useEffect(() => {
    if (currentTime < 0) {
      setGameDone(true);
      return;
    }
    if (!loading) {
      const interval = setInterval(timer, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTime, loading]);

  return (
    <div className="timer-container">
      {!gameDone ? <h1>YOU HAVE {currentTime} seconds</h1> : null}
    </div>
  );
};

export default Timer;
