const choices = document.querySelectorAll('.choice');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const winnerDisplay = document.getElementById('winner');
const resetBtn = document.getElementById('reset');

let userChoice = '';
let computerChoice = '';

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    userChoice = choice.dataset.choice;
    computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];

    userChoiceDisplay.textContent = `You chose: ${userChoice}`;
    computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
    checkWinner();
  });
});

function checkWinner() {
  if (userChoice === computerChoice) {
    winnerDisplay.textContent = "It's a tie!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    winnerDisplay.textContent = "You win! 🎉";
  } else {
    winnerDisplay.textContent = "Computer wins 😢";
  }
}

resetBtn.addEventListener('click', () => {
  userChoiceDisplay.textContent = '';
  computerChoiceDisplay.textContent = '';
  winnerDisplay.textContent = '';
});
