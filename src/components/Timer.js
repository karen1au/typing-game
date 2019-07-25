import React, { useState, useEffect, useContext } from "react";
import GameContext from "../game-context";
import LoadingContext from "../loading-context";

const Timer = props => {
  const [currentTime, setTimer] = useState(60);

  const { setGameDone } = useContext(GameContext);
  const { loading, setLoading } = useContext(LoadingContext);
  
  const timer = () => setTimer(currentTime - 1);
  
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(timer, 1000);
      return () => clearInterval(interval);
    }
    if (currentTime <= 0) {
      setGameDone(true);
      return;
    }
  }, [currentTime, loading]);

  return (
    <div className="timer-container">
      {currentTime ? <h1>YOU HAVE {currentTime} seconds</h1> : null}
    </div>
  );
};

export default Timer;
