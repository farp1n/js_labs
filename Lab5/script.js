const startBtn = document.getElementById('startBtn');
const setupScreen = document.getElementById('setup');
const gameScreen = document.getElementById('game-area');

let gameInterval;

startBtn.addEventListener('click', () => {
    
    const selectedDiff = document.querySelector('input[name="diff"]:checked');
    const colorVal = document.querySelector('input[name="clr"]:checked');

    if (!selectedDiff || !colorVal) {
        alert("Оберіть і складність, і колір!");
        return;
    }

    
    let config = { time: 4000, size: 60, range: 400 }; 
    
    if (selectedDiff.value === 'medium') {
        config = { time: 2000, size: 40, range: 600 };
    } else if (selectedDiff.value === 'hard') {
        config = { time: 1000, size: 20, range: 750 };
    }

   
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    startGame(config, colorVal.value);
});

function startGame(config, color) {
    if (gameInterval) clearInterval(gameInterval);

    const createTarget = () => {
        gameScreen.innerHTML = ''; 

        const target = document.createElement('div');
        target.className = 'target';
        
        target.style.width = config.size + 'px';
        target.style.height = config.size + 'px';
        target.style.backgroundColor = color;

       
        const maxX = Math.min(config.range, 800 - config.size);
        const maxY = Math.min(config.range, 500 - config.size);
        
        target.style.left = Math.random() * maxX + 'px';
        target.style.top = Math.random() * maxY + 'px';

        target.onclick = () => {
            createTarget(); 
            clearInterval(gameInterval); 
            gameInterval = setInterval(createTarget, config.time);
        };

        gameScreen.appendChild(target);
    };

    createTarget();
    gameInterval = setInterval(createTarget, config.time);
}
