import "../styles/index.css";
import TicTacToeApp from "./TicTacToe/TicTacToeMain.tsx";
import React from "react";

export default function App() {
  return (
    <div>
      <div className="ticTacToeApp">
        <TicTacToeApp />
      </div>
    </div>
  );
}
