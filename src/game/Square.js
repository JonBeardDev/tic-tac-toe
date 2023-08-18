import React from "react";

/**
 * Applies value and click handler to each square on the board
 * @param value
 * empty at beginning of the game, replaced with "O" or "X" as square is clicke on
 * @param onClick
 * click handler function
 * @returns {JSX.Element}
 */
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
