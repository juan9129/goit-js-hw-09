let interval;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16).padStart(6, '0')}`;
}

const colorChange = () => document.body.style.backgroundColor = getRandomHexColor();

function startButton() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    colorChange();
    interval = setInterval(colorChange, 1000);
}

function stopButton() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(interval);
}

startBtn.addEventListener('click', startButton);
stopBtn.addEventListener('click', stopButton);

