const gameBoard = (() => {
  let board = [['', '', ''], 
               ['', '', ''], 
               ['', '', '']];
  
  const getBoard = () => {
    return board;
  }

  const setMarker = (marker, row, column) => {
    if (board[row][column] === '') {
      board[row][column] = marker;
      return true;
    } else {
      return false;
    }
  }

  const reset = () => {
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 2; j++) {
        board[i][j] = '';
      }
    }
  }

  return {setMarker, reset, getBoard}
})();

const displayController = (() => {
  const renderPlayerForm = () => {

  }
  const renderBoard = () => {
    let htmlString = '';
    for (let i = 0; i < 3; i += 1){
      for (let j = 0; j < 3; j += 1){
        htmlString += gameBoard.getBoard()[i][j];
      }
      htmlString += '<br>';
    }
    $('body').html(htmlString);
    console.log(htmlString);
  }

  return {renderBoard}
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {getName, getMarker}
}

$(document).ready(() => {
  displayController.renderBoard();
});