import { useState, useRef } from "react";

export default function Player() {
  const [savedPlayerName, setSavedPlayerName] = useState("unknown entity");
  const playerName = useRef();

  function handleClick() {
    setSavedPlayerName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>
        Welcome {savedPlayerName === "" ? "unknown entity" : savedPlayerName}
      </h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
