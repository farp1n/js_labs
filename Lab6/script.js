const levels = [
    {
        id: 'a',
        target: 7,
        matrix: [[1,1,1,1],[0,0,1,0],[1,0,1,1],[0,0,1,1],[0,0,1,1]],
        r: 5, c: 4
    },
    {
        id: 'b',
        target: 8,
        matrix: [[1,0,0,0],[0,1,1,1],[0,0,1,1],[0,0,1,0],[0,1,0,0]],
        r: 5, c: 4
    },
    {
        id: 'c',
        target: 9,
        matrix: [[1,0,0,0],[0,1,0,1],[1,0,0,1],[0,0,1,1],[1,0,0,0]],
        r: 5, c: 4
    }
];

const lvl = levels[Math.floor(Math.random() * levels.length)];
let moves = 0;
let lastPos = null;

const board = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');

document.getElementById('lvl-id').textContent = lvl.id;
document.getElementById('target-moves').textContent = lvl.target;

function init() {
    board.style.gridTemplateColumns = `repeat(${lvl.c}, 60px)`;
    for (let i = 0; i < lvl.r; i++) {
        for (let j = 0; j < lvl.c; j++) {
            const cell = document.createElement('button');
            cell.className = `cell ${lvl.matrix[i][j] ? 'on' : 'off'}`;
            cell.dataset.pos = `${i}-${j}`;
            cell.onclick = () => click(i, j);
            board.appendChild(cell);
        }
    }
}

function click(i, j) {
    const pos = `${i}-${j}`;
    if (lastPos === pos) {
        moves--;
        lastPos = null;
    } else {
        moves++;
        lastPos = pos;
    }
    
    moveDisplay.textContent = moves;
    toggle(i, j);
    
    if (document.querySelectorAll('.on').length === 0) {
        document.getElementById('status').textContent = "Виконано!";
    }
}

function toggle(i, j) {
    const points = [[i,j], [i-1,j], [i+1,j], [i,j-1], [i,j+1]];
    points.forEach(([y, x]) => {
        if (y >= 0 && y < lvl.r && x >= 0 && x < lvl.c) {
            const el = document.querySelector(`[data-pos="${y}-${x}"]`);
            el.classList.toggle('on');
            el.classList.toggle('off');
        }
    });
}

init();
