import React from "react";
import Square from "./Square";

function Board({ squares, onClick, enableSquares }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => enableSquares && onClick(i)} />;
  };

  return (
    <div>
      <div className="d-flex">
        <div className="b-bottom b-right">{renderSquare(0)}</div>
        <div className="b-bottom b-left b-right">{renderSquare(1)}</div>
        <div className="b-bottom b-left">{renderSquare(2)}</div>
      </div>
      <div className="d-flex">
        <div className="b-bottom b-right b-top">{renderSquare(3)}</div>
        <div className="b-bottom b-left b-right b-top">{renderSquare(4)}</div>
        <div className="b-bottom b-left b-top">{renderSquare(5)}</div>
      </div>
      <div className="d-flex">
        <div className="b-top b-right">{renderSquare(6)}</div>
        <div className="b-top b-left b-right">{renderSquare(7)}</div>
        <div className="b-top b-left">{renderSquare(8)}</div>
      </div>
    </div>
  );
}

export default Board;
