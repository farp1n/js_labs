
const levels = [
    {
        matrix: [
            [1, 1, 1, 1],
            [0, 0, 1, 0],
            [1, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 1]
        ],
        rows: 5, cols: 4
    },
    {
        matrix: [
            [1, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 1, 0, 0]
        ],
        rows: 5, cols: 4
    },
    {
        matrix: [
            [1, 0, 0, 0],
            [0, 1, 0, 1],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [1, 0, 0, 0]
        ],
        rows: 5, cols: 4
    }
];

let currentLevel = levels[Math.floor(Math.random() * levels.length)];
let moves = 0;
let lastClickedPos = null;

const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const moveDisplay = document.getElementById('move-count');

function initGame() {
    board.style.gridTemplateColumns = `repeat(${currentLevel.cols}, 60px)`;
    board.innerHTML = '';
    
    for (let r = 0; r < currentLevel.rows; r++) {
        for (let c = 0; c < currentLevel.cols; c++) {
            const cell = document.createElement('div');
            cell.className = `cell ${currentLevel.matrix[r][c] === 1 ? 'on' : 'off'}`;
            cell.dataset.pos = `${r}-${c}`;
            cell.onclick = () => handleMove(r, c);
            board.appendChild(cell);
        }
    }
}

function handleMove(r, c) {
    const currentPos = `${r}-${c}`;
    
   
    if (lastClickedPos === currentPos) {
        moves--;
        lastClickedPos = null; 
    } else {
        moves++;
        lastClickedPos = currentPos;
    }
    
    moveDisplay.innerText = moves;
    toggleLights(r, c);
    checkWin();
}

function toggleLights(r, c) {
    const neighbors = [[r, c], [r-1, c], [r+1, c], [r, c-1], [r, c+1]];
    neighbors.forEach(([row, col]) => {
        if (row >= 0 && row < currentLevel.rows && col >= 0 && col < currentLevel.cols) {
            const el = document.querySelector(`[data-pos="${row}-${col}"]`);
            el.classList.toggle('on');
            el.classList.toggle('off');
        }
    });
}

function checkWin() {
    const onCells = document.querySelectorAll('.on');
    if (onCells.length === 0) {
        statusDisplay.innerText = "Перемога! Всі вогні згасли.";
    }
}

initGame();
