const grid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');

let score = 0;
let timeLeft = 15;
let gameActive = false;
let blinkInterval;
let gameTimer;
let countdownInterval;

const boxes = [];

// Create 4x4 grid
for (let i = 0; i < 16; i++) {
  const box = document.createElement('div');
  box.classList.add('box');

  box.addEventListener('click', () => {
    if (!gameActive) return;
    if (box.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      box.classList.remove('active');
      box.style.backgroundColor = '#fff3e0';
    }
  });

  grid.appendChild(box);
  boxes.push(box);
}

// Blink random box
function blinkBox() {
  boxes.forEach(b => {
    b.classList.remove('active');
    b.style.backgroundColor = '#fff3e0';
  });

  const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
  randomBox.classList.add('active');
  randomBox.style.backgroundColor = '#ff9800';
}

// Start game
function startGame() {
  if (gameActive) return;

  score = 0;
  timeLeft = 15;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameActive = true;

  blinkInterval = setInterval(blinkBox, 800);

  // Countdown timer
  countdownInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}

// End game
function endGame() {
  if (!gameActive) return;

  gameActive = false;
  clearInterval(blinkInterval);
  clearInterval(countdownInterval);

  boxes.forEach(b => {
    b.classList.remove('active');
    b.style.backgroundColor = '#fff3e0';
  });

}

// Buttons
startBtn.addEventListener('click', startGame);

resetBtn.addEventListener('click', () => {
  endGame();
  score = 0;
  timeLeft = 15;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
});
