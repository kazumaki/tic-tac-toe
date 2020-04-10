import '../css/reset.css';
import '../css/style.scss';
import game from './game';
import gameBoard from './board';
import player from './player';

const { $ } = window;

/* const game = (() => {
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

const gameBoard = (() => {
  const board = ['', '', '',
    '', '', '',
    '', '', ''];

  let successfulMoves = 0;

  const getBoard = () => board;

  const getSuccessfulMoves = () => successfulMoves;

  const setMarker = (index) => {
    if (board[index] === '') {
      board[index] = game.getCurrentPlayer().getMarker();
    } else {
      if (board[index] === game.getCurrentPlayer().getMarker()) {
        return 'You already have marked that place!';
      }
      return `That place is already marked by ${game.getOtherPlayer().getName()}`;
    }

    successfulMoves += 1;

    return false;
  };

  const reset = () => {
    for (let i = 0; i < 9; i += 1) {
      board[i] = '';
    }

    successfulMoves = 0;
  };

  const getBoardHtmlString = () => {
    let index = 0;
    const htmlString = `
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
      <button class='reset-button'>Reset</button>`;

    return htmlString;
  };

  return {
    setMarker, reset, getBoard, getBoardHtmlString, getSuccessfulMoves,
  };
})(); */


/* eslint-disable prefer-const */

let callbackClosureColumn;
let callbackClosureReset;

callbackClosureReset = () => {
  gameBoard.reset();
  $('.board-wrapper').html(gameBoard.getBoardHtmlString(game.getCurrentPlayer()));
  $('.reset-button').click(callbackClosureReset);
  $('.column').click(callbackClosureColumn);
};

callbackClosureColumn = (event) => {
  const errorMessage = gameBoard.setMarker($(event.target).data('index'), game.getCurrentPlayer());

  if (errorMessage) {
    $('.alert-message').html(errorMessage);
    $('.alert-box').addClass('show-element');
    $('.column').off('click');
  } else if (game.gameOver(gameBoard)) {
    $('.alert-message').html(game.gameOver(gameBoard));
    $('.alert-box').addClass('show-element');
    $('.column').off('click');
    gameBoard.reset();
    $('.board-wrapper').html(gameBoard.getBoardHtmlString(game.getCurrentPlayer()));
    $('.reset-button').click(callbackClosureReset);
  } else {
    $('.board-wrapper').html(gameBoard.getBoardHtmlString(game.getCurrentPlayer()));
    $('.reset-button').click(callbackClosureReset);
    $('.column').click(callbackClosureColumn);
  }
};

/* eslint-disable prefer-const */

const callbackClosureAlertBox = () => {
  $('.alert-box').removeClass('show-element');
  $('.column').off('click');
  $('.column').click(callbackClosureColumn);
};

$(document).ready(() => {
  $('.enter-players').submit(function submitButtonHandler(event) {
    $('.enter-players').addClass('hide-form');

    const players = {
      player1: player($(this).serializeArray()[0].value, 'X'),
      player2: player($(this).serializeArray()[1].value, 'O'),
    };

    game.startGame(players);

    $('.board-wrapper').html(gameBoard.getBoardHtmlString(game.getCurrentPlayer()));
    $('.reset-button').click(callbackClosureReset);
    $('.column').click(callbackClosureColumn);
    $('.alert-box-button').click(callbackClosureAlertBox);
    event.preventDefault();
  });
});