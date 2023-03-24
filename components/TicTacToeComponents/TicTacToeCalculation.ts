import type { SquareValue } from "../../type/TypeTicTacToe";

export const calculateNextValue = (squares: SquareValue[]): SquareValue => {
  const xSquaresCount = squares.filter((r) => r === "X").length;
  const oSquaresCount = squares.filter((r) => r === "O").length;
  return oSquaresCount === xSquaresCount ? "X" : "O";
};

export const calculateStatus = (
  squares: SquareValue[],
  nextPlayer: string,
  winner?: string | null
): string => {
  if (winner) {
    return `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    return `Scratch: Cat's game`;
  } else {
    return `Next player: ${nextPlayer}`;
  }
};

export const getDefaultSquares = (): SquareValue[] => {
  return Array.from({ length: 9 }, () => null as SquareValue);
};

export const calculateWinner = (squares: SquareValue[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: line,
      };
    }
  }
  return {
    winner: null,
    winningSquares: [],
  };
};

export default calculateWinner;
