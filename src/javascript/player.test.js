import player from './player';

test('Expect player1.getName() to be equal Jaak', () => {
  const player1 = player('Jaak', 'X');
  expect(player1.getName()).toBe('Jaak');
});

test('Expect player1.getMarker() to be equal X', () => {
  const player1 = player('Jaak', 'X');
  expect(player1.getMarker()).toBe('X');
});