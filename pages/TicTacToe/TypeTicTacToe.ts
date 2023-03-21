import {
  SquareValue,
  UserNames,
} from "./TicTacToeComponents/TicTacToeCalculation";

export type UseUserNamesFormReturnType = {
  userXRef: React.RefObject<HTMLInputElement>;
  userORef: React.RefObject<HTMLInputElement>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type GameProviderReturnType = {
  squares: SquareValue[];
  setSquares: () => void;
  xUserName: string | null;
  oUserName: string | null;
  status: string;
  winner: string | null;
  winningSquares?: number[];
  setUserNames: (userNames: UserNames) => void;
  onSquareClick: (index: number) => void;
};

export type SquareValue = "X" | "O" | null;

export type UserNames = {
  X: string | null;
  O: string | null;
};

export type NonNullableUserNames = DeepNonNullable<UserNames>;

export type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
export type retryButton = {
  winner?: string | null;
  setSquares: (newState: string) => void;
};
