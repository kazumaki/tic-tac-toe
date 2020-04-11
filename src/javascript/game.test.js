import gameBoard from './board';
import player from './player';
import game from './game';

let players;

beforeEach(() => {
  players = {
    player1: player('Vinicius', 'X'),
    player2: player('Jaak', 'O'),
  };
  game.startGame(players);
});

afterEach(() => {
  gameBoard.reset();
});

test('game.startGame(players) should set the currentPlayer inside game module', () => {
  expect(game.getCurrentPlayer().getName()).toBe('Vinicius');
});

test('game.startGame(players) should set the otherPlayer inside game module', () => {
  expect(game.getOtherPlayer().getName()).toBe('Jaak');
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(0, players.player1);
  gameBoard.setMarker(1, players.player1);
  gameBoard.setMarker(2, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(3, players.player1);
  gameBoard.setMarker(4, players.player1);
  gameBoard.setMarker(5, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(6, players.player1);
  gameBoard.setMarker(7, players.player1);
  gameBoard.setMarker(8, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(0, players.player1);
  gameBoard.setMarker(3, players.player1);
  gameBoard.setMarker(6, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(1, players.player1);
  gameBoard.setMarker(4, players.player1);
  gameBoard.setMarker(7, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(2, players.player1);
  gameBoard.setMarker(5, players.player1);
  gameBoard.setMarker(8, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(0, players.player1);
  gameBoard.setMarker(4, players.player1);
  gameBoard.setMarker(8, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is won', () => {
  gameBoard.setMarker(2, players.player1);
  gameBoard.setMarker(4, players.player1);
  gameBoard.setMarker(6, players.player1);
  expect(game.gameOver(gameBoard)).toBe(`${players.player1.getName()} won the game!`);
});

test('game.gameOver(gameBoard) should notice if game is a tie', () => {
  gameBoard.setMarker(0, players.player1);
  gameBoard.setMarker(1, players.player2);
  gameBoard.setMarker(2, players.player2);
  gameBoard.setMarker(3, players.player2);
  gameBoard.setMarker(4, players.player1);
  gameBoard.setMarker(5, players.player1);
  gameBoard.setMarker(6, players.player2);
  gameBoard.setMarker(7, players.player1);
  gameBoard.setMarker(8, players.player2);
  expect(game.gameOver(gameBoard)).toBe('The game is tied');
});