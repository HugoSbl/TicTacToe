import { useContext } from "react";
import { GameContext } from "~/pages/TicTacToe/TicTacToeMain";

const useGame = () => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("type of GameContext is null");
  }
  return context;
};
export default useGame;
