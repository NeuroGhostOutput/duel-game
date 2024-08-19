import React from "react";
import Game from "./components/Game";

function App() {
  return (
    <div
      className="App"
      style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}
    >
      <h1>Duel Game</h1>
      <div style={{ marginBottom: "20px" }}></div>
      <Game />
    </div>
  );
}

export default App;
