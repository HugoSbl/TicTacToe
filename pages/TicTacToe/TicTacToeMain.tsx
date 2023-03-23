import type { PropsWithChildren } from "react";
import React, {
  useRef,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
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
} from "../../type/TypeTicTacToe";

import toast, { Toaster } from "react-hot-toast";
import RetryButton from "~/components/InterfaceComponents/RetryButton";
import Board from "~/components/TicTacToeComponents/Board";

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

  const toto = "";

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

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

const GameContext = createContext<GameProviderReturnType | null>(null);

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

  console.log("winner", winner);

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  const status = calculateStatus(
    squares,
    nextValue ? `${userNames[nextValue]}'s turn (${nextValue})` : "",
    winner ? userNames[winner] : winner
  );

  const isGameFinished2 = squares.every(Boolean);

  console.log("isGameFinishedi", isGameFinished2);

  useEffect(() => {
    (winner || isGameFinished2) && setIsGameFinished(true);
  }, [winner, isGameFinished2]);

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
    setSquares,
    xUserName,
    oUserName,
    status,
    winner,
    winningSquares,
    isGameFinished,
    setIsGameFinished,
    handleRetryButton,
    setUserNames,
    onSquareClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const Game = () => {
  const {
    squares,
    setSquares,
    xUserName,
    oUserName,
    status,
    winningSquares,
    handleRetryButton,
    isGameFinished,
    setIsGameFinished,
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
        // setIsGameFinished={setIsGameFinished}
        setSquares={setSquares}
      />
    </div>
  );
};

const useGame = () => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("type of GameContext is null");
  }
  return context;
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
