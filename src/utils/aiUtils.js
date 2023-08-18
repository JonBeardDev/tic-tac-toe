import calculateWinner from "./calculateWinner";

export function easyAI(currentBoard) {
  // Find empty squares
  const emptySquares = currentBoard
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  // Choose a random empty square and place AI move in it
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  const aiMove = emptySquares[randomIndex];
  const newBoard = [...currentBoard];
  newBoard[aiMove] = "X";

  return newBoard;
}

export function mediumAI(currentBoard) {
  // Find empty squares
  const emptySquares = currentBoard
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  // First check if AI has a winning move available and take it if so
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i];
    const tempBoard = [...currentBoard];
    tempBoard[move] = "X";
    if (calculateWinner(tempBoard) === "X") {
      return tempBoard;
    }
  }

  // If no winning move, check if player has a winning move and block it if so
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i];
    const tempBoard = [...currentBoard];
    tempBoard[move] = "O";
    if (calculateWinner(tempBoard) === "O") {
      tempBoard[move] = "X";
      return tempBoard;
    }
  }

  // If no winning or blocking move available, play in a random empty square
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  const aiMove = emptySquares[randomIndex];
  const newBoard = [...currentBoard];
  newBoard[aiMove] = "X";
  return newBoard;
}

export function impossibleAI(currentBoard) {
  const emptySquares = currentBoard
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null);

  let bestScore = -Infinity;
  let bestMove = null;

  // Use minimax function to determine best currently available move
  for (let i = 0; i < emptySquares.length; i++) {
    const move = emptySquares[i];

    // Simulate AI's move and evaluate score
    currentBoard[move] = "X";
    const aiScore = minimax(currentBoard, 0, true); // Minimize player's score
    currentBoard[move] = null;

    // Simulate human player's move and evaluate score
    currentBoard[move] = "O";
    const humanScore = minimax(currentBoard, 0, false); // Maximize AI's score
    currentBoard[move] = null;

    const score = aiScore - humanScore

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  const newBoard = [...currentBoard];
  newBoard[bestMove] = "X";

  return newBoard;
}

function minimax(board, depth, isMaximizingPlayer) {
  const winner = calculateWinner(board);
  if (winner === "X") {
    return 10 - depth;
  }
  if (winner === "O") {
    return depth - 10;
  }
  if (board.every((square) => square !== null)) {
    return 0;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        const score = minimax(board, depth + 1, false); // Flip to review score from minimizing player perspective
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        const score = minimax(board, depth + 1, true); // Flip to review score from maximizing player perspective
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
