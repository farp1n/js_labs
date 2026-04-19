const levels = [
    {
        id: 'a',
        target: 7,
        matrix: [
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 1]
        ]
    },
    {
        id: 'b',
        target: 8,
        matrix: [
            [1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0]
        ]
    },
    {
        id: 'c',
        target: 9,
        matrix: [
            [1, 0, 0, 0, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 1, 1],
            [0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0]
        ]
    }
];

const lvl = levels[Math.floor(Math.random() * levels.length)];
let moves = 0;
let lastPos = null;
const board = document.getElementById('game-board');

document.getElementById('lvl-id').textContent = lvl.id;
document.getElementById('target-moves').textContent = lvl.target;

function init() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
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
    
    document.getElementById('move-count').textContent = moves;
    toggle(i, j);
    
    
    const offCells = document.querySelectorAll('.off');
    if (offCells.length === 0) {
        document.getElementById('status').textContent = "ПЕРЕМОГА! ВСЕ УКВІМКНЕНО";
    }
}

function toggle(i, j) {
    [[i,j], [i-1,j], [i+1,j], [i,j-1], [i,j+1]].forEach(([y, x]) => {
        if (y >= 0 && y < 5 && x >= 0 && x < 5) {
            const el = document.querySelector(`[data-pos="${y}-${x}"]`);
            el.classList.toggle('on');
            el.classList.toggle('off');
        }
    });
}

init();
