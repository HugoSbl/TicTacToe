import {
  useRef,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";
import { Board } from "./TicTacToeComponents/Board";
import { GameInfo } from "./TicTacToeComponents/GameInfo";
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
  calculateWinner,
} from "./TicTacToeComponents/TicTacToeCalculation";
import {
  UseUserNamesFormReturnType,
  GameProviderReturnType,
  SquareValue,
  UserNames,
} from "./TypeTicTacToe";

const useUserNamesForm = (): UseUserNamesFormReturnType => {
  const { setUserNames } = useGame();
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      return;
    }
    if (userX.length > 10 || userO.length > 10) {
      return;
    }

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
    <form onClick={onSubmit} className="vertical-stack">
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

  const status = calculateStatus(
    squares,
    `${userNames[nextValue]}'s turn (${nextValue})`,
    winner ? userNames[winner] : winner
  );

  const onSquareClick = (index: number) => {
    if (!winner) {
      setSquares((current) => {
        const newSquares = [...current];
        newSquares[index] = nextValue;
        return newSquares;
      });
    } else {
      return;
    }
  };

  const value: GameProviderReturnType = {
    squares,
    xUserName,
    oUserName,
    status,
    winningSquares,
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

const Game = () => {
  const {
    squares,
    xUserName,
    oUserName,
    status,
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
    </div>
  );
};

export default function TicTacToeApp() {
  return (
    // 🦁 Wrap notre composant avec le context
    <GameProvider>
      <h2>TicTacToe</h2>
      <Game />
    </GameProvider>
  );
}
