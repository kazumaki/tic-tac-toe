const gameBoard = (() => {
  let board = ['', '', '', 
               '', '', '', 
               '', '', ''];
  
  let succesfulMoves = 0;

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
    succesfulMoves += 1;
    return false;
  }

  const reset = () => {
    console.log('what');
    for(i = 0; i < 9; i += 1){
      board[i] = '';
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

  const gameOver = (currentPlayer) => {
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] 
    for (const winCondition of winConditions) {
        if (board[winCondition[0]] === board[winCondition[1]] && board[winCondition[0]] === board[winCondition[2]]
            && board[winCondition[0]] != '') {
          return `${currentPlayer.getName()} won the game!`;
        }
    }
    if (succesfulMoves == 9) {
      return 'The game is tied'
    }

    return false;
  }

  const winRows = (currentPlayer) => {
    row1 = [board[0], board[1], board[2]].every(marker => {
      return marker == currentPlayer.getMarker();
    })
    row2 = [board[3], board[4], board[5]].every(marker => {
      return marker == currentPlayer.getMarker();
    })
    row3 = [board[6], board[7], board[8]].every(marker => {
      return marker == currentPlayer.getMarker();
    })

    return row1 || row2 || row3;
  }
  

  return {setMarker, reset, getBoard, getBoardHtmlString, gameOver}
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
  players = { 
    player1: Player('John Doe 1', 'X'),
    player2: Player('Jane Doe 2', 'O')
  }

  let currentPlayer = players.player1;
  
  $('.board-wrapper').html(gameBoard.getBoardHtmlString());


  const callbackClosureColumn = (event) => {
    let errorMessage = gameBoard.setMarker(players, currentPlayer, $(event.target).data('index'));
    
    if (errorMessage) {
      alert(errorMessage);
    }else{
      if (gameBoard.gameOver(currentPlayer)) {
        alert(gameBoard.gameOver(currentPlayer));
      }
      currentPlayer = currentPlayer.getMarker() == players.player1.getMarker() ? players.player2 : players.player1;
      $('.board-wrapper').html(gameBoard.getBoardHtmlString());
      $('.column').click(callbackClosureColumn);
    }
  };
  
  const callbackClosureReset = () => {
    gameBoard.reset();
    $('.board-wrapper').html(gameBoard.getBoardHtmlString());
    $('.column').click(callbackClosureColumn);
  }

  $('.reset-button').click(callbackClosureReset)
  $('.column').click(callbackClosureColumn);
});