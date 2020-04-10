const game = (() => {
  let currentPlayer;
  let otherPlayer;

  const startGame = (players) => {
    currentPlayer = players.player1;
    otherPlayer = players.player2;
  };

  const getCurrentPlayer = () => currentPlayer;

  const getOtherPlayer = () => otherPlayer;

  const gameOver = (gameBoard) => {
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < winConditions.length; i += 1) {
      if (gameBoard.getBoard()[winConditions[i][0]] === gameBoard.getBoard()[winConditions[i][1]]
        && gameBoard.getBoard()[winConditions[i][0]] === gameBoard.getBoard()[winConditions[i][2]]
        && gameBoard.getBoard()[winConditions[i][0]] !== '') {
        return `${currentPlayer.getName()} won the game!`;
      }
    }


    if (gameBoard.getSuccessfulMoves() === 9) {
      return 'The game is tied';
    }

    [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];

    return false;
  };

  return {
    startGame, getCurrentPlayer, getOtherPlayer, gameOver,
  };
})();

export default game;