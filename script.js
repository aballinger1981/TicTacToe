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

function ready() {
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
      initialComputerTurn();
    });
  }
}

function setPlayerTwoName() {
  if (numberOfPlayers === 'two-players') { return; }

  const playerTwo = document.getElementById('player-two');
  playerTwo.innerHTML = 'Computer: <span class="score"> 0</span>';
}

function getRandomNumber() {
  return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
}

function initialComputerTurn() {
  if (numberOfPlayers === 'two-players') { return; }

  const randomNumber = getRandomNumber();
  const square = document.getElementById(randomNumber);

  setTimeout(() => {
    if (xOrO === 'x') {
      square.innerHTML = 'O';
    } else {
      square.innerHTML = 'X';
    }
    playerOneTurn();
  }, 3000);
}

function playerOneTurn() {
  const gameSquares = document.getElementsByClassName('square-content');
  document.addEventListener('click', function handler(event) {
    if (!event) { event = window.event; }

    if (event.target.classList.contains('square-content')) {
      if (xOrO === 'x') {
        event.target.innerHTML = 'X';
      } else {
        event.target.innerHTML = 'O';
      }
      document.removeEventListener('click', handler);
    }
  });
}