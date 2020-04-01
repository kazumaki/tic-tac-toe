const gameBoard = (() => {
  let board = ['', '', '', 
               '', '', '', 
               '', '', ''];
  
  let successfulMoves = 0;

  const getBoard = () => {
    return board;
  }

  const getSuccessfulMoves = () => {
    return successfulMoves;
  }

  const setMarker = (index) => {
    if (board[index] === '') {
      board[index] = game.getCurrentPlayer().getMarker();
    } else {
      if (board[index] === game.getCurrentPlayer().getMarker()) {
        return `You already have marked that place!`;
      } else {
        return `That place is already marked by ${game.getOtherPlayer().getName()}`;
      }
    }

    successfulMoves += 1;
    
    return false;
  }

  const reset = () => {
    for(i = 0; i < 9; i += 1){
      board[i] = '';
    }

    successfulMoves = 0;
  }

  const getBoardHtmlString = () => {
    let index = 0;

    return `
      <div class="current-player">${game.getCurrentPlayer().getName()} turn!</div>
      <div class="board">
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
      </div>
      <button class='reset-button'>Reset</button>`
  }

  return {setMarker, reset, getBoard, getBoardHtmlString, getSuccessfulMoves}
})();

const game = (() => {
  let currentPlayer;
  let otherPlayer;

  const startGame = (players) => {
    currentPlayer = players.player1;
    otherPlayer = players.player2;
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const getOtherPlayer = () => {
    return otherPlayer;
  }

  const gameOver = () => {
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] 
    
    for (const winCondition of winConditions) {
        if (gameBoard.getBoard()[winCondition[0]] === gameBoard.getBoard()[winCondition[1]] && gameBoard.getBoard()[winCondition[0]] === gameBoard.getBoard()[winCondition[2]]
            && gameBoard.getBoard()[winCondition[0]] != '') {
          return `${currentPlayer.getName()} won the game!`;
        }
    }

    if (gameBoard.getSuccessfulMoves() == 9) {
      return 'The game is tied'
    }

    [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
    
    return false;
  }

  return {startGame, getCurrentPlayer, getOtherPlayer, gameOver};
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {getName, getMarker}
}

const callbackClosureColumn = (event) => {
  let errorMessage = gameBoard.setMarker($(event.target).data('index'));
  
  if (errorMessage) {
    $('.alert-message').html(errorMessage);
    $('.alert-box').addClass('show-element');
    $('.column').off('click');
  } else {
    if (game.gameOver()) {
      $('.alert-message').html(game.gameOver())
      $('.alert-box').addClass('show-element');
      $('.column').off('click');
      gameBoard.reset();
      $('.board-wrapper').html(gameBoard.getBoardHtmlString());
      $('.reset-button').click(callbackClosureReset);
    }
    else {
      $('.board-wrapper').html(gameBoard.getBoardHtmlString());
      $('.reset-button').click(callbackClosureReset);
      $('.column').click(callbackClosureColumn);
    }
  }
};

const callbackClosureReset = () => {
  gameBoard.reset();
  $('.board-wrapper').html(gameBoard.getBoardHtmlString());
  $('.reset-button').click(callbackClosureReset);
  $('.column').click(callbackClosureColumn);
}

const callbackClosureAlertBox = () => {
  $('.alert-box').removeClass('show-element')
  $('.column').off('click');
  $('.column').click(callbackClosureColumn);
}

$(document).ready(() => {
  $(".enter-players").submit(function(event) {
    $('.enter-players').addClass('hide-form');

    players = { 
      player1: Player($(this).serializeArray()[0].value, 'X'),
      player2: Player($(this).serializeArray()[1].value, 'O')
    }
    
    game.startGame(players);
    
    $('.board-wrapper').html(gameBoard.getBoardHtmlString());
    $('.reset-button').click(callbackClosureReset);
    $('.column').click(callbackClosureColumn);
    $('.alert-box-button').click(callbackClosureAlertBox);
    event.preventDefault();
  });
});