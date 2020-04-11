const gameBoard = (() => {
  const board = ['', '', '',
    '', '', '',
    '', '', ''];

  let successfulMoves = 0;

  const getBoard = () => board;

  const getSuccessfulMoves = () => successfulMoves;

  const setMarker = (index, currentPlayer) => {
    if (board[index] === '') {
      board[index] = currentPlayer.getMarker();
    } else {
      if (board[index] === currentPlayer.getMarker()) {
        return 'You already have marked that place!';
      }
      return `That place is already marked by ${currentPlayer.getName()}`;
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

  const getBoardHtmlString = (currentPlayer) => {
    let index = 0;
    const htmlString = `
      <div class="current-player">${currentPlayer.getName()} turn!</div>
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
})();

export default gameBoard;