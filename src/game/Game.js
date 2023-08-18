import React, { useCallback, useEffect, useMemo, useState } from "react";
import rabbit from "../images/rabbit.png";
import rabbit_select from "../images/rabbit-select.png";
import fox from "../images/fox.png";
import fox_select from "../images/fox-select.png";
import owl from "../images/owl.png";
import owl_select from "../images/owl-select.png";
import penguin from "../images/penguin.png";
import penguin_select from "../images/penguin-select.png";
import squirrel from "../images/squirrel.png";
import squirrel_select from "../images/squirrel-select.png";
import calculateWinner from "../utils/calculateWinner";
import Board from "./Board";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import "./Game.css";
import { easyAI, mediumAI, impossibleAI } from "../utils/aiUtils";

function Game() {
  const history = useHistory();
  const startPlayer = Math.floor(Math.random() * 2) + 1;
  const { difficulty } = useParams();
  const [turn, setTurn] = useState(startPlayer);
  const [aiStart, setAIStart] = useState(
    difficulty !== "Human" && startPlayer === 2
  );
  const [enableSquares, setEnableSquares] = useState(
    startPlayer === 1 || difficulty === "Human"
  );
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winnerText, setWinnerText] = useState("Placeholder");
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [ties, setTies] = useState(0);

  const opponentData = {
    Easy: { img: rabbit, select: rabbit_select, name: "Bad Bunny" },
    Medium: { img: fox, select: fox_select, name: "Sly Fox" },
    Impossible: { img: owl, select: owl_select, name: "Wise Owl" },
    Human: { img: squirrel, select: squirrel_select, name: "Player 2" },
  };

  const {
    img: opponentImg,
    select: opponentSelect,
    name: opponentName,
  } = opponentData[difficulty];

  const aiFunctions = useMemo(
    () => ({
      Easy: easyAI,
      Medium: mediumAI,
      Impossible: impossibleAI,
    }),
    []
  );

  const aiMove = useCallback(
    (currentBoard) => {
      const aiFunction = aiFunctions[difficulty];
      if (aiFunction) {
        const aiBoard = aiFunction(currentBoard);
        setBoard(aiBoard);
        return aiBoard;
      }
      return currentBoard;
    },
    [aiFunctions, difficulty, setBoard]
  );

  useEffect(() => {
    if (aiStart) {
      setAIStart(false);
      setTimeout(() => {
        const aiBoard = aiMove(board);
        setBoard(aiBoard);
        setEnableSquares(true);
        setTurn(1);
      }, 1000);
    }
  }, [aiStart, board, aiMove]);

  const handleClick = (index) => {
    if (!board[index] && !gameOver) {
      if (difficulty !== "Human") {
        setEnableSquares(false);
      }
      const newBoard = [...board];
      newBoard[index] = turn === 1 ? "O" : "X";
      setBoard(newBoard);

      let winner = calculateWinner(newBoard);
      let isTie = newBoard.every((square) => square !== null);
      let switchTurns = true;

      if (winner) {
        let newWinnerText;
        if (winner === "O") {
          setPlayer1Wins((currentWins) => ++currentWins);

          if (difficulty === "Human") {
            newWinnerText = "Player 1 wins!";
          } else {
            newWinnerText = "You win!";
          }
        } else {
          setPlayer2Wins((currentWins) => ++currentWins);
          newWinnerText = `${opponentName} wins!`;
        }
        setWinnerText(newWinnerText);
        setGameOver(true);
        switchTurns = false;
      } else if (isTie) {
        setTies((currentTies) => ++currentTies);
        setWinnerText("It's a tie!");
        setGameOver(true);
        switchTurns = false;
      }

      if (switchTurns) {
        setTurn(turn === 1 ? 2 : 1);

        if (difficulty !== "Human") {
          setTimeout(() => {
            const aiBoard = aiMove(newBoard);
            const aiWinner = calculateWinner(aiBoard);
            const aiTie = aiBoard.every((square) => square !== null);

            if (aiWinner) {
              setPlayer2Wins((currentWins) => ++currentWins);
              setWinnerText(`${opponentName} wins!`);
              setGameOver(true);
            } else if (aiTie) {
              setTies((currentTies) => ++currentTies);
              setWinnerText("It's a tie!");
              setGameOver(true);
            } else {
              setTurn(1);
              setEnableSquares(true);
            }
          }, 1000);
        }
      }
    }
  };

  const newGameButton = () => {
    const newStartPlayer = Math.floor(Math.random() * 2) + 1;
    setTurn(newStartPlayer);
    setAIStart(difficulty !== "Human" && newStartPlayer === 2);
    setEnableSquares(
      newStartPlayer === 1 || difficulty === "Human" ? true : false
    );
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setWinnerText("Placeholder");
  };

  const menuButton = () => {
    history.push("/menu");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-center border border-light border-2 rounded rounded-3 p-5 mx-5 game-frame">
        <h2
          className="text-center text-white py-2"
          style={{ visibility: gameOver ? "visible" : "hidden" }}
        >
          {winnerText}
        </h2>
        <div className="d-flex justify-content-evenly gap-4">
          <div className="d-flex flex-column justify-content-center text-white text-center align-items-center">
            <button className="button mb-auto" onClick={newGameButton}>
              Start New Game
            </button>
            <h3
              style={{ color: turn === 1 || gameOver ? "rgb(235, 245, 103)" : "transparent" }}
              className="turn"
            >
              {!gameOver ? "Your Turn" : "Game Over"}
            </h3>
            <div className="img-container">
              {turn === 1 ? (
                <img
                  src={penguin_select}
                  alt="Player 1 logo (highlighted - Player 1's turn)"
                />
              ) : (
                <img
                  src={penguin}
                  alt="Player 1 logo (not highlighted - Player 2's turn)"
                />
              )}
            </div>
            <h5 className="wins">Player 1 Wins: {player1Wins}</h5>
          </div>
          <div className="game">
            <div className="game-board">
              <Board
                squares={board}
                onClick={handleClick}
                enableSquares={enableSquares}
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center text-white text-center align-items-center">
            <button className="button mb-auto" onClick={menuButton}>
              Return to Menu
            </button>
            <h3
              style={{ color: turn === 2 || gameOver ? "rgb(235, 245, 103)" : "transparent" }}
              className="turn"
            >
              {gameOver
                ? "Game Over"
                : difficulty === "Human"
                ? "Your Turn"
                : "Thinking..."}
            </h3>
            <div className="img-container">
              {turn === 2 ? (
                <img
                  src={opponentSelect}
                  alt="Player 2 logo (highlighted - Player 2's turn)"
                />
              ) : (
                <img
                  src={opponentImg}
                  alt="Player 2 logo (not highlighted - Player 1's turn)"
                />
              )}
            </div>
            <h5 className="wins">
              {opponentName} Wins: {player2Wins}
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-evenly align-items-center text-white text-center pt-4 mb-3">
          <h5 className="wins">Ties: {ties}</h5>
        </div>
      </div>
    </div>
  );
}

export default Game;
