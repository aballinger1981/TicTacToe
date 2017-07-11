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

      if (numberOfPlayers === 'one-player') {
        computerTurn();
      }
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

function getLetterForComputer() {
  let letter;
  if (xOrO === 'x') {
    letter = 'O';
  } else {
    letter = 'X';
  }
  return letter;
}

function computerTurn() {
  let square = checkGameBoard();
  console.log(square);
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
    square.innerHTML = getLetterForComputer();
    gameMap.set(square.id, square.innerHTML);
    playerOneTurn();
  }, 3000);
}

function playerOneTurn() {
  document.addEventListener('click', function handler(event) {
    if (!event) { event = window.event; }

    if (event.target.classList.contains('square-content')
      && event.target.innerHTML == '') {
      if (xOrO === 'x') {
        event.target.innerHTML = 'X';
      } else {
        event.target.innerHTML = 'O';
      }
      document.removeEventListener('click', handler);
      gameMap.set(event.target.id, event.target.innerHTML);
      computerTurn();
    }
  });
}

function checkGameBoard() {
  let letter = getLetterForComputer();
  let opponentLetter;
  if (letter === 'X') {
    opponentLetter = 'O';
  } else {
    opponentLetter = 'X';
  }

  if (gameMap.get('1') === opponentLetter) {
    if (gameMap.get('2') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('3') === opponentLetter && document.getElementById('2').innerHTML === '') {
      return document.getElementById('2');
    } else if (gameMap.get('4') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('4').innerHTML === '') {
      return document.getElementById('4');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    }
  }

  if (gameMap.get('2') === opponentLetter) {
    if (gameMap.get('1') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('3') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('8').innerHTML === '') {
      return document.getElementById('8');
    } else if (gameMap.get('8') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    }
  }

  if (gameMap.get('3') === opponentLetter) {
    if (gameMap.get('2') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('1') === opponentLetter && document.getElementById('2').innerHTML === '') {
      return document.getElementById('2');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    } else if (gameMap.get('6') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('6').innerHTML === '') {
      return document.getElementById('6');
    }
  }

  if (gameMap.get('4') === opponentLetter) {
    if (gameMap.get('1') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('6').innerHTML === '') {
      return document.getElementById('6');
    } else if (gameMap.get('6') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    }
  }

  if (gameMap.get('5') === opponentLetter) {
    if (gameMap.get('1') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('2') === opponentLetter && document.getElementById('8').innerHTML === '') {
      return document.getElementById('8');
    } else if (gameMap.get('8') === opponentLetter && document.getElementById('2').innerHTML === '') {
      return document.getElementById('2');
    } else if (gameMap.get('3') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('4') === opponentLetter && document.getElementById('6').innerHTML === '') {
      return document.getElementById('6');
    } else if (gameMap.get('6') === opponentLetter && document.getElementById('4').innerHTML === '') {
      return document.getElementById('4');
    }
  }

  if (gameMap.get('6') === opponentLetter) {
    if (gameMap.get('3') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('4') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('4').innerHTML === '') {
      return document.getElementById('4');
    }
  }

  if (gameMap.get('7') === opponentLetter) {
    if (gameMap.get('1') === opponentLetter && document.getElementById('4').innerHTML === '') {
      return document.getElementById('4');
    } else if (gameMap.get('4') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('3') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    } else if (gameMap.get('8') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('8').innerHTML === '') {
      return document.getElementById('8');
    }
  }

  if (gameMap.get('8') === opponentLetter) {
    if (gameMap.get('2') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('2').innerHTML === '') {
      return document.getElementById('2');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('9').innerHTML === '') {
      return document.getElementById('9');
    } else if (gameMap.get('9') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    }
  }

  if (gameMap.get('9') === opponentLetter) {
    if (gameMap.get('1') === opponentLetter && document.getElementById('5').innerHTML === '') {
      return document.getElementById('5');
    } else if (gameMap.get('5') === opponentLetter && document.getElementById('1').innerHTML === '') {
      return document.getElementById('1');
    } else if (gameMap.get('3') === opponentLetter && document.getElementById('6').innerHTML === '') {
      return document.getElementById('6');
    } else if (gameMap.get('6') === opponentLetter && document.getElementById('3').innerHTML === '') {
      return document.getElementById('3');
    } else if (gameMap.get('7') === opponentLetter && document.getElementById('8').innerHTML === '') {
      return document.getElementById('8');
    } else if (gameMap.get('8') === opponentLetter && document.getElementById('7').innerHTML === '') {
      return document.getElementById('7');
    }
  }
}