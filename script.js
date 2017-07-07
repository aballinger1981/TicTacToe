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
  const playerChoice = document.getElementsByClassName("player-choice");

  for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].addEventListener("click", function () {
      const playerSelect = document.getElementById("player-select");
      const gamePieceSelect = document.getElementById("game-piece-select");

      playerSelect.setAttribute("style", "animation: fadeOut .5s linear forwards");
      gamePieceSelect.setAttribute("style", "animation: fadeIn 1s linear forwards");

      numberOfPlayers = playerChoice[i].id;
      gamePieceSelectionHandler();
    });
  }
}

function gamePieceSelectionHandler() {
  const xAndO = document.getElementsByClassName("xAndO");

  for (let i = 0; i < xAndO.length; i++) {
    xAndO[i].addEventListener("click", function () {
      const gamePieceSelect = document.getElementById("game-piece-select");
      const gameBoard = document.getElementById("game-board");
      const playerData = document.getElementById("player-data");
      const reset = document.getElementById("reset-container");

      gamePieceSelect.setAttribute("style", "animation: fadeOut .5s linear forwards");
      gameBoard.setAttribute("style", "animation: fadeIn 1s linear forwards");
      playerData.setAttribute("style", "animation: fadeIn 1s linear forwards");
      reset.setAttribute("style", "animation: fadeIn 1s linear forwards");

      xOrO = xAndO[i].id;
    });
  }
}