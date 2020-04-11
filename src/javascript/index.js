import '../css/reset.css';
import '../css/style.scss';
import game from './game';
import gameBoard from './board';
import player from './player';

const { $ } = window;

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