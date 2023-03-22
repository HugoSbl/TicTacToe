import type React from "react";

export type UseUserNamesFormReturnType = {
  userXRef: React.RefObject<HTMLInputElement>;
  userORef: React.RefObject<HTMLInputElement>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type GameProviderReturnType = {
  squares: SquareValue[];
  setSquares: (newSquares: SquareValue[]) => void;
  xUserName: string | null;
  oUserName: string | null;
  status: string;
  winner: string | null;
  winningSquares?: number[];
  setIsGameFinished?: (isGameFinished: boolean) => void;
  isGameFinished: boolean;
  setUserNames: (userNames: UserNames) => void;
  onSquareClick: (index: number) => void;
};

export type SquareValue = "O" | "X" | null;

export type UserNames = {
  X: string | null;
  O: string | null;
};

export type NonNullableUserNames = DeepNonNullable<UserNames>;

export type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
export type retryButton = {
  isGameFinished: boolean;
  setIsGameFinished?: (isGameFinished: boolean) => void;
  setSquares: (newState: SquareValue[]) => void;
};
