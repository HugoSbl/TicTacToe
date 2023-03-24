import type { retryButton } from "../../type/TypeTicTacToe";
import React from "react";

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
