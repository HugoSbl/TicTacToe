import type { SquareValue } from "../../type/TypeTicTacToe";

import Square from "./Square";

type BoardProps = {
  squares: SquareValue[];
  winningSquares?: number[];
  onClick?: (index: number) => void;
};

const Board = ({ squares, onClick, winningSquares }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          onClick={() => onClick?.(index)}
          isWinningSquare={winningSquares?.includes(index)}
          key={index}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

export default Board;
