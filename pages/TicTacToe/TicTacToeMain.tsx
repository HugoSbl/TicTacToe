import type { PropsWithChildren } from "react";
import React, { useRef, useState, useContext, createContext } from "react";
import Board from "../../components/TicTacToeComponents/Board";
import GameInfo from "../../components/TicTacToeComponents/GameInfo";
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
  calculateWinner,
} from "../../components/TicTacToeComponents/TicTacToeCalculation";
import type {
  UseUserNamesFormReturnType,
  GameProviderReturnType,
  SquareValue,
  UserNames,
  retryButton,
} from "../../type/TypeTicTacToe";
import toast, { Toaster } from "react-hot-toast";

const useUserNamesForm = (): UseUserNamesFormReturnType => {
  const { setUserNames } = useGame();
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      toast.error("Please enter your usernames");
      return;
    }
    if (userX.length > 10 || userO.length > 10) {
      toast.error("10 characters maximum");
      return;
    }
    if (userX === userO) {
      toast.error("Please enter two unique usernames");
      return;
    }

    toast.success(`Player X : ${userX}\n Player O : ${userO}`);
    setUserNames({ X: userX, O: userO });
  };

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

const UserNameForm = () => {
  const { userXRef, userORef, onSubmit } = useUserNamesForm();

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

const GameContext = createContext<GameProviderReturnType | null>(null);

const GameProvider = ({ children }: PropsWithChildren) => {
  const [squares, setSquares] = useState<SquareValue[]>(() =>
    getDefaultSquares()
  );
  const [userNames, setUserNames] = useState<UserNames>({
    X: null,
    O: null,
  });

  const { winner, winningSquares } = calculateWinner(squares);

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  const gameEnding = () => {};

  const status = calculateStatus(
    squares,
    nextValue ? `${userNames[nextValue]}'s turn (${nextValue})` : "",
    winner ? userNames[winner] : winner,
    isGameFinished
  );

  const onSquareClick = (index: number) => {
    if (isGameFinished) {
      return null;
    } else {
      setSquares((current) => {
        const newSquares = [...current];
        newSquares[index] = nextValue;
        return newSquares;
      });
    }
  };

  const value: GameProviderReturnType = {
    squares,
    setSquares,
    xUserName,
    oUserName,
    status,
    winner,
    winningSquares,
    isGameFinished,
    setUserNames,
    onSquareClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("type of GameContext is null");
  }
  return context;
};

const RetryButton = ({ winner, setSquares }: retryButton) => {
  const handleRetryButton = () => {
    const newState = getDefaultSquares();
    setSquares(newState);
  };

  return winner ? (
    <>
      <button onClick={() => handleRetryButton()}>try again</button>
    </>
  ) : (
    <></>
  );
};

const Game = () => {
  const {
    squares,
    setSquares,
    xUserName,
    oUserName,
    status,
    winner,
    winningSquares,
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
      <RetryButton winner={winner} setSquares={setSquares} />
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
