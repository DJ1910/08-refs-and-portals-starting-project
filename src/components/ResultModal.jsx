import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ({ remainingTime, targetTime, onReset }, ref) {
  const modal = useRef();

  const hasLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - (remainingTime/(targetTime*1000))) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={modal} className="result-modal" onClose={onReset}>
      {hasLost && <h2>You lost</h2>}
      {!hasLost && <h2>Your score: {score}</h2>}
      <p>
        Target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}.
        </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>
          {formattedRemainingTime} second
          {formattedRemainingTime == 1 ? "" : "s"} left.
        </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
