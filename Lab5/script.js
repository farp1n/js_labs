const startBtn = document.getElementById('startBtn');
const setupScreen = document.getElementById('setup');
const gameScreen = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const timerBar = document.getElementById('timer-bar');
const statsUI = document.getElementById('stats-ui');

let score = 0;
let timeLeft;
let gameActive = false;
let countdownInterval;
let currentConfig;
let currentColor;

startBtn.addEventListener('click', () => {
    const selectedDiff = document.querySelector('input[name="diff"]:checked');
    const colorVal = document.querySelector('input[name="clr"]:checked');

    if (!selectedDiff || !colorVal) {
        alert("Будь ласка, оберіть усі налаштування!");
        return;
    }

    
    if (selectedDiff.value === 'easy') {
        currentConfig = { level: 'easy', time: 4000, size: 70 };
    } else if (selectedDiff.value === 'medium') {
        currentConfig = { level: 'medium', time: 2000, size: 45 };
    } else {
        currentConfig = { level: 'hard', time: 1000, size: 25 };
    }

    currentColor = colorVal.value;
    score = 0;
    gameActive = true;
    scoreDisplay.textContent = score;

    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    statsUI.style.display = 'block';

    nextTurn();
});

function nextTurn() {
    if (!gameActive) return;

    
    const oldTarget = document.querySelector('.target');
    if (oldTarget) oldTarget.remove();

    const target = document.createElement('div');
    target.className = 'target';
    target.style.width = currentConfig.size + 'px';
    target.style.height = currentConfig.size + 'px';
    target.style.backgroundColor = currentColor;

    
    const arenaW = gameScreen.clientWidth;
    const arenaH = gameScreen.clientHeight;
    let minX, maxX, minY, maxY;

    if (currentConfig.level === 'easy') {
        minX = arenaW * 0.3; maxX = arenaW * 0.7 - currentConfig.size;
        minY = arenaH * 0.3; maxY = arenaH * 0.7 - currentConfig.size;
    } else if (currentConfig.level === 'medium') {
        minX = arenaW * 0.1; maxX = arenaW * 0.9 - currentConfig.size;
        minY = arenaH * 0.1; maxY = arenaH * 0.9 - currentConfig.size;
    } else {
        minX = 0; maxX = arenaW - currentConfig.size;
        minY = 0; maxY = arenaH - currentConfig.size;
    }

    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY)) + minY;
    
    target.style.left = x + 'px';
    target.style.top = y + 'px';

    target.onclick = (e) => {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = score;
        nextTurn(); 
    };

    gameScreen.appendChild(target);
    startTimer();
}

function startTimer() {
    clearInterval(countdownInterval);
    timeLeft = currentConfig.time;
    
    const step = 100; 
    countdownInterval = setInterval(() => {
        timeLeft -= step;
        
        
        timeLeftDisplay.textContent = (timeLeft / 1000).toFixed(1);
        const percent = (timeLeft / currentConfig.time) * 100;
        timerBar.style.width = percent + "%";

        if (timeLeft <= 0) {
            gameOver();
        }
    }, step);
}

function gameOver() {
    gameActive = false;
    clearInterval(countdownInterval);
    alert("Гру закінчено! Ви набрали очок: " + score);
    location.reload(); 
}
