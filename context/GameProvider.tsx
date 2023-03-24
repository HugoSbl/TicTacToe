import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  GameProviderReturnType,
  SquareValue,
  UserNames,
} from "~/type/TypeTicTacToe";
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
  getDefaultSquares,
} from "~/components/TicTacToeComponents/TicTacToeCalculation";

export const GameContext = createContext<GameProviderReturnType | null>(null);

export const GameProvider = ({ children }: PropsWithChildren) => {
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

  return (
    <GameContext.Provider value={value}> {children} </GameContext.Provider>
  );
};

export default GameProvider;
