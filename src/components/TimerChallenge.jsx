import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);  
  const isTimerActive = (timeRemaining > 0) && (timeRemaining < targetTime * 1000);

  const timer = useRef();
  const modal = useRef();

  if(timeRemaining <= 0) {
    clearInterval(timer.current);
    modal.current.open();
  }  

  function handleStart() {
    timer.current = setInterval(() => {
        setTimeRemaining(currentTimeRemaining => currentTimeRemaining - 10)
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    modal.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={modal} onReset={handleReset} remainingTime={timeRemaining} targetTime={targetTime} /> 
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
