import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type SquareProps = ComponentPropsWithoutRef<"button"> & {
  isWinningSquare?: boolean;
};

const Square = ({ children, isWinningSquare, ...props }: SquareProps) => {
  return (
    <button
      className={clsx("square", {
        "winning-square": isWinningSquare,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Square;
