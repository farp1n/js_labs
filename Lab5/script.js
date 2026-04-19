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
        alert("Вибери параметри!");
        return;
    }

    
    if (selectedDiff.value === 'easy') {
        currentConfig = { time: 4000, size: 70, areaW: 300, areaH: 200 };
    } else if (selectedDiff.value === 'medium') {
        currentConfig = { time: 2000, size: 45, areaW: 500, areaH: 350 };
    } else {
        currentConfig = { time: 1000, size: 25, areaW: 770, areaH: 470 };
    }

    currentColor = colorVal.value;
    score = 0;
    gameActive = true;

    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    statsUI.style.display = 'block';

    nextTurn();
});

function nextTurn() {
    if (!gameActive) return;

    // Очистка поля
    const oldTarget = document.querySelector('.target');
    if (oldTarget) oldTarget.remove();

    
    const target = document.createElement('div');
    target.className = 'target';
    target.style.width = currentConfig.size + 'px';
    target.style.height = currentConfig.size + 'px';
    target.style.backgroundColor = currentColor;

    
    const x = Math.random() * currentConfig.areaW;
    const y = Math.random() * currentConfig.areaH;
    target.style.left = x + 'px';
    target.style.top = y + 'px';

    target.onclick = (e) => {
        e.stopPropagation(); 
        score++;
        scoreDisplay.textContent = score;
        clearInterval(countdownInterval);
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
    alert("Кінець гри! Ваші очки: " + score);
    location.reload(); 
}
