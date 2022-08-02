const currentGame = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "×";

let lockedGame = true;

const turnParagraph = document.querySelector(
  ".container__turn-announcer-paragraph"
);
turnParagraph.textContent = `It's [${currentPlayer}] turn to play`;

const cells = document.querySelectorAll(".cell"); //Arrays containing all the divs with the class cell

for (cell of cells) {
  cell.addEventListener("click", handleClick);
}

function handleClick(event) {
  let clickedBox = event.target;
  const boxIndex = clickedBox.getAttribute("data-index");

  if (currentGame[boxIndex] !== "" || !lockedGame) {
    return;
  }
  currentGame[boxIndex] = currentPlayer;
  clickedBox.innerHTML = `<span>${currentPlayer}</span>`;

  isGameFinished();
}

const winningCombinations = [
  [0, 1, 2], //row wins
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //column wins
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //diagonal wins
  [2, 4, 6],
];

function isGameFinished() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combinationCheck = winningCombinations[i];

    let a = currentGame[combinationCheck[0]]; //This notation looks a bit funky but here's what it means:

    //   does the current game matches any winning combinations?

    let b = currentGame[combinationCheck[1]];
    let c = currentGame[combinationCheck[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    } else if (a === b && b === c) {
      const winningPlayer = currentPlayer;
      turnParagraph.textContent = `The player [${winningPlayer}] won! Please refresh the page to start a new game`;
      lockedGame = false;
      return;
    }
  }

  switchPlayers();
  if (!currentGame.includes("")) {
    turnParagraph.textContent = `The game's a draw! Please refresh the page to play a new game`;
    lockedGame = false;
    return;
  }
}

function switchPlayers() {
  currentPlayer = currentPlayer === "×" ? "○" : "×";
  turnParagraph.textContent = `it's [${currentPlayer}] turn to play`;
}
