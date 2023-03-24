import type { PropsWithChildren } from "react";
import React, { useState, createContext, useEffect } from "react";
import GameInfo from "../../components/TicTacToeComponents/GameInfo";
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
  calculateWinner,
} from "../../components/TicTacToeComponents/TicTacToeCalculation";
import type {
  GameProviderReturnType,
  SquareValue,
  UserNames,
} from "../../type/TypeTicTacToe";

import { Toaster } from "react-hot-toast";
import RetryButton from "~/components/InterfaceComponents/RetryButton";
import Board from "~/components/TicTacToeComponents/Board";
import useGame from "~/hooks/useGame";
import useUserNamesForm from "~/hooks/useUserNamesForm";

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

export const GameContext = createContext<GameProviderReturnType | null>(null);

const GameProvider = ({ children }: PropsWithChildren) => {
  const [squares, setSquares] = useState<SquareValue[]>(() =>
    getDefaultSquares()
  );
  const [userNames, setUserNames] = useState<UserNames>({
    X: null,
    O: null,
  });
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const { winner, winningSquares } = calculateWinner(squares);

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  const status = calculateStatus(
    squares,
    nextValue ? `${userNames[nextValue]}'s turn (${nextValue})` : "",
    winner ? userNames[winner] : winner
  );

  const checkIfGameIsFinished = squares.every(Boolean);

  useEffect(() => {
    (winner || checkIfGameIsFinished) && setIsGameFinished(true);
  }, [winner, checkIfGameIsFinished]);

  const handleRetryButton = () => {
    const newState = getDefaultSquares();
    setSquares(newState);
    setIsGameFinished(false);
  };

  const onSquareClick = (index: number) => {
    if (winner) {
      return null;
    }
    if (squares[index] === null) {
      setSquares((current) => {
        const newSquares = [...current];
        newSquares[index] = nextValue;
        return newSquares;
      });
    } else return;
  };

  const value: GameProviderReturnType = {
    squares,
    xUserName,
    oUserName,
    status,
    winner,
    winningSquares,
    isGameFinished,
    handleRetryButton,
    setUserNames,
    onSquareClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
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
