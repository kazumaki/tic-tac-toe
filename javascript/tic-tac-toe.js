const gameBoard = (() => {
  let board = ['', '', '', 
               '', '', '', 
               '', '', ''];
  
  const getBoard = () => {
    return board;
  }

  const setMarker = (players, currentPlayer, index) => {
    if (board[index] === '') {
      board[index] = currentPlayer.getMarker();
    } else {
      if (board[index] === currentPlayer.getMarker()) {
        return `You already have marked that place!`;
      } else {
        let otherPlayer;

        for (const player of Object.values(players)) {
          if (player.getMarker != currentPlayer.getMarker) {
            otherPlayer = player;
            break;
          }
        }

        return `That place is already marked by ${otherPlayer.getName()}`;
      }

    }

    return false;
  }

  const reset = () => {
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 2; j++) {
        board[i][j] = '';
      }
    }
  }

  const getBoardHtmlString = () => {
    let index = 0;

    return `<div class="board">
          <div class="row row-1">
              <div class="column column-1" data-index="${index}">${board[0]}</div>
              <div class="vertical-border"></div>
              <div class="column column-2" data-index="${index += 1}">${board[1]}</div>
              <div class="vertical-border"></div>
              <div class="column column-3" data-index="${index += 1}">${board[2]}</div>
          </div>
          <div class="horizontal-border"></div>
          <div class="row row-2">
              <div class="column column-1" data-index="${index += 1}">${board[3]}</div>
              <div class="vertical-border"></div>
              <div class="column column-2" data-index="${index += 1}">${board[4]}</div>
              <div class="vertical-border"></div>
              <div class="column column-3" data-index="${index += 1}">${board[5]}</div>
          </div>
          <div class="horizontal-border"></div>
          <div class="row row-3">
              <div class="column column-1" data-index="${index += 1}">${board[6]}</div>
              <div class="vertical-border"></div>
              <div class="column column-2" data-index="${index += 1}">${board[7]}</div>
              <div class="vertical-border"></div>
              <div class="column column-3" data-index="${index += 1}">${board[8]}</div>
          </div>
      </div>`
  }

  return {setMarker, reset, getBoard, getBoardHtmlString}
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
  // displayController.renderBoard();

  players = { 
    player1: Player('John Doe', 'X'),
    player2: Player('Jane Doe', 'O')
  }
  
  $('body').html(gameBoard.getBoardHtmlString());


  const callbackClosureColumn = (event) => {
    let errorMessage = gameBoard.setMarker(players, players.player1, $(event.target).data('index'));
    
    if (errorMessage) {
      console.log(errorMessage);
    }
    
    $('body').html(gameBoard.getBoardHtmlString());
    $('.column').click(callbackClosureColumn);
  };
  
  $('.column').click(callbackClosureColumn);
});