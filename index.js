const POSSIBLE_ACTIONS = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) =>
  button.addEventListener("click", getPlayerChoice, true)
);

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getPlayerChoice() {
  let className = this.classList.value;
  let choice;

  if (className === "button") {
    choice = this.getAttribute("data-action");
    console.log(choice);
    playRound(choice);
  }
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * 3);
  return POSSIBLE_ACTIONS[randomIndex];
}

// function getPlayerChoice() {
//   input = prompt("Choose either rock, paper or scissors");
//   if (input) {
//     return input.toLowerCase();
//   } else {
//     return "";
//   }
// }

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

function printScores(computerScore, playerScore) {
  console.log(`${playerScore} - player, ${computerScore} - PC`);
}

function playRound(playerSelection) {
  let computerSelection = getComputerChoice();

  if (POSSIBLE_ACTIONS.includes(playerSelection)) {
    if (isDraw(computerSelection, playerSelection)) {
      console.log("It's a draw!");
      return null;
    } else if (getWinner(computerSelection, playerSelection) === "player") {
      console.log(
        `You won! ${capitalize(playerSelection)} beats ${computerSelection}`
      );
      return "player";
    } else {
      console.log(
        `You lose! ${capitalize(computerSelection)} beats ${playerSelection}`
      );
      return "computer";
    }
  } else {
    console.log(
      "You've entered an unknown action. Please input either rock, paper or scissors"
    );
    return null;
  }
}

function announceFinalWinner(computerScore, playerScore) {
  if (computerScore === playerScore) {
    console.log("Nobody won this game!");
  } else if (computerScore > playerScore) {
    console.log("PC won this game!");
  } else {
    console.log("Player won this game!");
  }
}

// function game() {
//   let playerScore = (computerScore = 0);

//   for (let i = 0; i < 5; i++) {
//     let winner = playRound();

//     if (winner !== null) {
//       if (winner === "player") {
//         playerScore++;
//       } else {
//         computerScore++;
//       }
//     }

//     printScores(computerScore, playerScore);
//   }

//   announceFinalWinner(computerScore, playerScore);
// }
