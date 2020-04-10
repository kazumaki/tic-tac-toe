import gameBoard from './board';
import player from './player';

test('Expect gameBoard.getBoard()[5] to be equal X after gameBoard.setMarker(5, player1) get called', () => {
  const player1 = player('Vinicius', 'X');
  gameBoard.setMarker(5, player1);
  expect(gameBoard.getBoard()[5]).toBe('X');
});

test('Expect gameBoard.getBoard()[5] not to be equal  after gameBoard.setMarker(5, player1) and gameBoard.reset() get called', () => {
  const player1 = player('Vinicius', 'X');
  gameBoard.setMarker(5, player1);
  gameBoard.reset();
  expect(gameBoard.getBoard()[5]).not.toBe('X');
});

test('Expect gameBoard.getSuccessfulMoves() to be equal 4 after 4 corrects gameBoard.setMarker() calls', () => {
  const player1 = player('Vinicius', 'X');
  gameBoard.setMarker(0, player1);
  gameBoard.setMarker(1, player1);
  gameBoard.setMarker(2, player1);
  gameBoard.setMarker(3, player1);
  expect(gameBoard.getSuccessfulMoves()).toBe(4);
});