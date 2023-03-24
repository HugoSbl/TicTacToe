import React from "react";
import GameInfo from "../../components/TicTacToeComponents/GameInfo";
import { Toaster } from "react-hot-toast";
import RetryButton from "~/components/InterfaceComponents/RetryButton";
import Board from "~/components/TicTacToeComponents/Board";
import useGame from "~/hooks/useGame";
import useUserNamesForm from "~/hooks/useUserNamesForm";
import GameProvider from "~/context/GameProvider";

const UserNameForm = () => {
  const { userXRef, userORef, onSubmit } = useUserNamesForm(); // hook

  return (
    <form onSubmit={onSubmit} className="vertical-stack">
      <h3>Enter players names </h3>
      <label htmlFor="user1">X</label>
      <input id="user1" ref={userXRef} required minLength={2} />
      <label htmlFor="user2">O</label>
      <input id="user2" ref={userORef} required minLength={2} />
      <button type="submit">Submit</button>
    </form>
  );
};

const Game = () => {
  const {
    squares,
    xUserName,
    oUserName,
    status,
    winningSquares,
    isGameFinished,
    handleRetryButton,
    onSquareClick,
  } = useGame();

  if (!xUserName || !oUserName) {
    return <UserNameForm />;
  }

  return (
    <div className="game">
      <GameInfo
        status={status}
        userNames={{
          X: xUserName,
          O: oUserName,
        }}
      />
      <Board
        onClick={onSquareClick}
        winningSquares={winningSquares}
        squares={squares}
      />
      <RetryButton
        isGameFinished={isGameFinished}
        handleRetryButton={handleRetryButton}
      />
    </div>
  );
};

export default function TicTacToeApp() {
  return (
    <GameProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          error: { duration: 2000 },
          success: { duration: 3000 },
        }}
      />

      <h2>TicTacToe</h2>
      <Game />
    </GameProvider>
  );
}
