// this is required for the (not so) edge case where your script is loaded after the document has loaded
// https://developer.mozilla.org/en/docs/Web/API/Document/readyState
if (document.readyState !== 'loading') {
  ready();
} else {
  // the document hasn't finished loading/parsing yet so let's add an event handler
  document.addEventListener('DOMContentLoaded', ready);
}

let numberOfPlayers;
let xOrO;
let gameMap = new Map();
let whoWon = {};
let playerOneWins = 0;
let playerTwoOrComputerWins = 0;

function ready() {
  playerSelectHandler();

  const resetClick = document.getElementById('reset-container');
  resetClick.addEventListener('click', function () {
    resetBoard();
  });
}

function resetBoard() {
  const gameSquares = document.getElementsByClassName('square-content');
  const scores = document.getElementsByClassName('score');

  Array.prototype.forEach.call(gameSquares, square => {
    square.innerHTML = '';
  });
  Array.prototype.forEach.call(scores, score => {
    score.innerHTML = '0';
  });
  gameMap.clear();
  whoWon = {};
  playerOneWins = 0;
  playerTwoOrComputerWins = 0;
  document.removeEventListener('click', playerOneClickHandler);
  document.removeEventListener('click', playerTwoClickHandler);
  if (numberOfPlayers === 'one-player') {
    computerTurn();
  } else if (numberOfPlayers === 'two-players') {
    playerOneTurn();
  }
}

function playAgain() {
  const playAgainElement = document.getElementById('play-again');
  playAgainElement.setAttribute('style', 'animation: fadeInPlayAgain 1s linear forwards');
  document.removeEventListener('click', playerOneClickHandler);
  document.removeEventListener('click', playerTwoClickHandler);
  const playAgainYes = document.getElementById('play-again-yes');
  const playAgainNo = document.getElementById('play-again-no');
  gameMap.clear();
  whoWon = {};

  playAgainYes.addEventListener('click', playAgainYesClickHandler);
  playAgainNo.addEventListener('click', playAgainNoClickHandler);
}

function playAgainYesClickHandler(event) {
  const playAgainElement = document.getElementById('play-again');
  const gameSquares = document.getElementsByClassName('square-content');
  Array.prototype.forEach.call(gameSquares, square => {
    square.innerHTML = '';
  });
  playAgainElement.setAttribute('style', 'animation: fadeOut .5s linear forwards');

  if (numberOfPlayers === 'one-player') {
    computerTurn();
  } else {
    playerOneTurn();
  }
}

function playAgainNoClickHandler(event) {
  const gameBoardElement = document.getElementById('game-board');
  const playerDataElement = document.getElementById('player-data');
  const resetElement = document.getElementById('reset-container');
  const playAgainElement = document.getElementById('play-again');
  const playerSelectELement = document.getElementById('player-select');
  gameBoardElement.setAttribute('style', 'animation: fadeOut .5s linear forwards');
  playerDataElement.setAttribute('style', 'animation: fadeOut .5s linear forwards');
  resetElement.setAttribute('style', 'animation: fadeOut .5s linear forwards');
  playAgainElement.setAttribute('style', 'animation: fadeOut .5s linear forwards');
  numberOfPlayers = '';
  resetBoard();
  playerSelectELement.setAttribute('style', 'animation: fadeIn 1s linear forwards');
  document.removeEventListener('click', playAgainNoClickHandler);
  playerSelectHandler();
}

function playerSelectHandler() {
  const playerChoice = document.getElementsByClassName('player-choice');
  for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener('click', function () {
      const playerSelect = document.getElementById('player-select');
      const gamePieceSelect = document.getElementById('game-piece-select');
      playerSelect.setAttribute('style', 'animation: fadeOut .5s linear forwards');

      setTimeout(() => {
        playerSelect.setAttribute('style', 'display: none');
      }, 1000);

      gamePieceSelect.setAttribute('style', 'animation: fadeIn 1s 1s linear forwards');
      numberOfPlayers = playerChoice[i].id;
      gamePieceSelectionHandler();
    });
  }
}

function gamePieceSelectionHandler() {
  const xAndO = document.getElementsByClassName('xAndO');
  for (let i = 0; i < xAndO.length; i++) {
    xAndO[i].addEventListener('click', function () {
      const gamePieceSelect = document.getElementById('game-piece-select');
      const gameBoard = document.getElementById('game-board');
      const playerData = document.getElementById('player-data');
      const reset = document.getElementById('reset-container');
      gamePieceSelect.setAttribute('style', 'animation: fadeOut .5s linear forwards');

      setTimeout(() => {
        gamePieceSelect.setAttribute('style', 'display: none');
      }, 1000);

      gameBoard.setAttribute('style', 'animation: fadeIn 1s 1s linear forwards');
      playerData.setAttribute('style', 'animation: fadeIn 1s 1s linear forwards');
      reset.setAttribute('style', 'animation: fadeIn 1s 1s linear forwards');
      xOrO = xAndO[i].id;
      setPlayerTwoName();
      if (numberOfPlayers === 'one-player') {
        computerTurn();
      } else {
        playerOneTurn();
      }
    });
  }
}

function setPlayerTwoName() {
  if (numberOfPlayers === 'two-players') { return; }
  const playerTwo = document.getElementById('player-two');
  playerTwo.innerHTML = 'Computer: <span id="player-two-score" class="score"> 0</span>';
}

function getRandomNumber() {
  return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
}

function getLetterForComputerOrPlayerTwo() {
  let letter;
  if (xOrO === 'x') {
    letter = 'O';
  } else {
    letter = 'X';
  }
  return letter;
}

function computerTurn() {
  document.removeEventListener('click', playAgainYesClickHandler);

  let square = checkGameBoard(false);
  if (!square) {
    square = checkGameBoard(true);
  }

  if (!square) {
    let randomNumber = getRandomNumber();
    let randomNumberToString = randomNumber.toString();
    while (gameMap.has(randomNumberToString)) {
      randomNumber = getRandomNumber();
      randomNumberToString = randomNumber.toString();
    }
    square = document.getElementById(randomNumber);
  }

  setTimeout(() => {
    square.innerHTML = getLetterForComputerOrPlayerTwo();
    gameMap.set(square.id, square.innerHTML);
    const computerWon = checkForWinner('computer');
    const numberOfSquaresFilled = checkForDraw();
    if (numberOfSquaresFilled === 9) {
      playAgain();
    } else if (!computerWon) {
      playerOneTurn();
    } else {
      playerTwoOrComputerWins++;
      const playerTwoScore = document.getElementById('player-two-score');
      playerTwoScore.innerHTML = playerTwoOrComputerWins;
      playAgain();
    }
  }, 2000);
}

function playerOneTurn() {
  document.removeEventListener('click', playAgainYesClickHandler);
  document.addEventListener('click', playerOneClickHandler);
}

function playerOneClickHandler(event) {
  if (!event) { event = window.event; }

  if (event.target.classList.contains('square-content')
    && event.target.innerHTML == '') {
    if (xOrO === 'x') {
      event.target.innerHTML = 'X';
    } else {
      event.target.innerHTML = 'O';
    }
    document.removeEventListener('click', playerOneClickHandler);
    gameMap.set(event.target.id, event.target.innerHTML);
    const playerOneWon = checkForWinner('playerOne');
    const numberOfSquaresFilled = checkForDraw();
    if (numberOfSquaresFilled === 9) {
      playAgain();
    } else if (!playerOneWon && numberOfPlayers === 'one-player') {
      computerTurn();
    } else if (!playerOneWon && numberOfPlayers === 'two-players') {
      playerTwoTurn();
    } else {
      playerOneWins++;
      const playerOneScore = document.getElementById('player-one-score');
      playerOneScore.innerHTML = playerOneWins;
      playAgain();
    }
  }
}

function playerTwoTurn() {
  document.addEventListener('click', playerTwoClickHandler);
}

function playerTwoClickHandler(event) {
  if (!event) { event = window.event; }

  if (event.target.classList.contains('square-content')
    && event.target.innerHTML == '') {
    if (xOrO === 'x') {
      event.target.innerHTML = 'O';
    } else {
      event.target.innerHTML = 'X';
    }
    document.removeEventListener('click', playerTwoClickHandler);
    gameMap.set(event.target.id, event.target.innerHTML);
    const playerTwoWon = checkForWinner('playerTwo');
    const numberOfSquaresFilled = checkForDraw();
    if (numberOfSquaresFilled === 9) {
      playAgain();
    } else if (!playerTwoWon) {
      playerOneTurn();
    } else {
      playerTwoOrComputerWins++;
      const playerTwoScore = document.getElementById('player-two-score');
      playerTwoScore.innerHTML = playerTwoOrComputerWins;
      playAgain();
    }
  }
}

function checkGameBoard(checkingOpponent) {
  let letter = getLetterForComputerOrPlayerTwo();
  if (checkingOpponent === true) {
    if (letter === 'X') {
      letter = 'O';
    } else {
      letter = 'X';
    }
  }
  return findNextSquare(letter);
}

function findNextSquare(letter) {
  for (let i = 0; i < combinations.length; i++) {
    if (gameMap.get(combinations[i].id1) === letter
      && gameMap.get(combinations[i].id2) === letter) {
      element = document.getElementById(combinations[i].id3);
      if (element.innerHTML === '') {
        return element;
      }
    }
  }
  return false;
}

function checkForWinner(player) {
  let letter = getLetterForComputerOrPlayerTwo();
  if (player === 'playerOne') {
    if (letter === 'X') {
      letter = 'O';
    } else {
      letter = 'X';
    }
  }
  return findWinner(player, letter);
}

function findWinner(player, letter) {
  for (let i = 0; i < combinations.length; i++) {
    if (gameMap.get(combinations[i].id1) === letter
      && gameMap.get(combinations[i].id2) === letter
      && gameMap.get(combinations[i].id3) === letter) {
      whoWon = { winner: player, position: combinations[i].position };
      return true;
    }
  }
}

function checkForDraw() {
  const gameSquares = document.getElementsByClassName('square-content');
  const gameSquareArray = Array.prototype.filter.call(gameSquares, square => {
    if (square.innerHTML !== '') {
      return square;
    }
  });
  return gameSquareArray.length;
}