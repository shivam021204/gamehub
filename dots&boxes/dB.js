const GRID_SIZE = 5;
let currentPlayer = 1;
let scores = [0, 0];
let boxes = [];
let lines = { h: [], v: [] };

function initGame() {
    currentPlayer = 1;
    scores = [0, 0];
    boxes = Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE - 1).fill(0));
    lines = {
        h: Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE - 1).fill(0)),
        v: Array(GRID_SIZE - 1).fill(null).map(() => Array(GRID_SIZE).fill(0))
    };
    
    document.getElementById('score1').textContent = '0';
    document.getElementById('score2').textContent = '0';
    document.getElementById('winner').classList.remove('show');
    updatePlayerDisplay();
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    const rows = GRID_SIZE * 2 - 1;
    const cols = GRID_SIZE * 2 - 1;
    
    grid.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    grid.style.gridTemplateRows = `repeat(${rows}, auto)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const el = document.createElement('div');
            
            if (row % 2 === 0 && col % 2 === 0) {
                el.className = 'dot';
            } else if (row % 2 === 0 && col % 2 === 1) {
                el.className = 'h-line';
                const r = Math.floor(row / 2);
                const c = Math.floor(col / 2);
                if (lines.h[r][c]) {
                    el.classList.add('filled', 'p' + lines.h[r][c]);
                } else {
                    el.onclick = () => drawLine('h', r, c);
                }
            } else if (row % 2 === 1 && col % 2 === 0) {
                el.className = 'v-line';
                const r = Math.floor(row / 2);
                const c = Math.floor(col / 2);
                if (lines.v[r][c]) {
                    el.classList.add('filled', 'p' + lines.v[r][c]);
                } else {
                    el.onclick = () => drawLine('v', r, c);
                }
            } else {
                el.className = 'box';
                const r = Math.floor(row / 2);
                const c = Math.floor(col / 2);
                if (boxes[r][c]) {
                    el.classList.add('p' + boxes[r][c]);
                    el.textContent = boxes[r][c];
                }
            }
            
            grid.appendChild(el);
        }
    }
}

function drawLine(type, row, col) {
    if (lines[type][row][col]) return;
    
    lines[type][row][col] = currentPlayer;
    
    let boxesCompleted = 0;
    
    if (type === 'h') {
        if (row > 0 && checkBox(row - 1, col)) {
            boxes[row - 1][col] = currentPlayer;
            boxesCompleted++;
        }
        if (row < GRID_SIZE - 1 && checkBox(row, col)) {
            boxes[row][col] = currentPlayer;
            boxesCompleted++;
        }
    } else {
        if (col > 0 && checkBox(row, col - 1)) {
            boxes[row][col - 1] = currentPlayer;
            boxesCompleted++;
        }
        if (col < GRID_SIZE - 1 && checkBox(row, col)) {
            boxes[row][col] = currentPlayer;
            boxesCompleted++;
        }
    }
    
    if (boxesCompleted > 0) {
        scores[currentPlayer - 1] += boxesCompleted;
        document.getElementById('score' + currentPlayer).textContent = scores[currentPlayer - 1];
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updatePlayerDisplay();
    }
    
    renderGrid();
    checkGameOver();
}

function checkBox(row, col) {
    if (boxes[row][col]) return false;
    
    return lines.h[row][col] && 
           lines.h[row + 1][col] && 
           lines.v[row][col] && 
           lines.v[row][col + 1];
}

function updatePlayerDisplay() {
    document.getElementById('player1').classList.toggle('active', currentPlayer === 1);
    document.getElementById('player2').classList.toggle('active', currentPlayer === 2);
}

function checkGameOver() {
    const totalBoxes = (GRID_SIZE - 1) * (GRID_SIZE - 1);
    const completedBoxes = scores[0] + scores[1];
    
    if (completedBoxes === totalBoxes) {
        const winner = document.getElementById('winner');
        if (scores[0] > scores[1]) {
            winner.textContent = '🎉 Player 1 Wins! 🎉';
        } else if (scores[1] > scores[0]) {
            winner.textContent = '🎉 Player 2 Wins! 🎉';
        } else {
            winner.textContent = '🤝 It\'s a Tie! 🤝';
        }
        winner.classList.add('show');
    }
}

document.getElementById('resetBtn').addEventListener('click', initGame);

initGame();