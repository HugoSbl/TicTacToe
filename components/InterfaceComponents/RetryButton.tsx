import type { retryButton } from "../../type/TypeTicTacToe";
import { getDefaultSquares } from "../TicTacToeComponents/TicTacToeCalculation";
import React from "react";
import { SquareValue } from "../../type/TypeTicTacToe";

const RetryButton = ({ isGameFinished, handleRetryButton }: retryButton) => {
  return isGameFinished ? (
    <>
      <button onClick={() => handleRetryButton()}>try again</button>
    </>
  ) : (
    <></>
  );
};

export default RetryButton;
