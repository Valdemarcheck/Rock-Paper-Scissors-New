const POSSIBLE_ACTIONS = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll(".button");
const outputPara = document.querySelector(".output");
const score = document.querySelector(".score");
const round = document.querySelector(".round");

const retryBtn = document.querySelector(".retry-btn");
retryBtn.addEventListener("click", startNewGame);
retryBtn.style.display = "none";

let playerScore;
let computerScore;
let rounds_played;
let gameHasEnded;

buttons.forEach((button) =>
  button.addEventListener("click", getPlayerChoice, true)
);

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function printScores(computerScore, playerScore) {
  score.textContent = `${playerScore} - player, ${computerScore} - PC`;
}

function updateRoundCounter() {
  round.textContent = `Round: ${rounds_played}`;
}

function isDraw(computerSelection, playerSelection) {
  return computerSelection === playerSelection;
}

function getWinner(computerSelection, playerSelection) {
  switch (playerSelection) {
    case "rock":
      return computerSelection === "paper" ? "computer" : "player";
    case "paper":
      return computerSelection === "scissors" ? "computer" : "player";
    case "scissors":
      return computerSelection === "rock" ? "computer" : "player";
  }
}

function announceRoundWinner(computerSelection, playerSelection) {
  if (isDraw(computerSelection, playerSelection)) {
    outputPara.textContent = "It's a draw!";
  } else if (getWinner(computerSelection, playerSelection) === "player") {
    outputPara.textContent = `You won! ${capitalize(
      playerSelection
    )} beats ${computerSelection}`;

    playerScore++;
  } else {
    outputPara.textContent = `You lose! ${capitalize(
      computerSelection
    )} beats ${playerSelection}`;

    computerScore++;
  }
}

function announceFinalWinner() {
  if (computerScore === playerScore) {
    outputPara.textContent = "Nobody won this game!";
  } else if (computerScore > playerScore) {
    outputPara.textContent = "PC won this game!";
  } else {
    outputPara.textContent = "Player won this game!";
  }
}

function getPlayerChoice() {
  if (!gameHasEnded) {
    let className = this.classList.value;
    let choice;

    if (className === "button") {
      choice = this.getAttribute("data-action");
      console.log(choice);
      playRound(choice);
    }
  }
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * 3);
  return POSSIBLE_ACTIONS[randomIndex];
}

function playRound(playerSelection) {
  let computerSelection = getComputerChoice();

  if (POSSIBLE_ACTIONS.includes(playerSelection)) {
    announceRoundWinner(computerSelection, playerSelection);
  }

  rounds_played++;
  updateRoundCounter();
  printScores(computerScore, playerScore);

  if (computerScore === 5 || playerScore === 5) {
    announceFinalWinner();
    gameHasEnded = true;
    retryBtn.style.display = "block";
  }
}

function startNewGame() {
  playerScore = computerScore = 0;
  rounds_played = 0;
  gameHasEnded = false;
  score.textContent = "0 - player, 0 - PC";
  round.textContent = "Round: 1";
  retryBtn.style.display = "none";
}

startNewGame();
