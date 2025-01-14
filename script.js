let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    
    minutesDisplay.textContent = minutesStr;
    secondsDisplay.textContent = secondsStr;
    
    // Update the page title with the current timer
    document.title = `${minutesStr}:${secondsStr} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

function toggleMode() {
    if (timerId !== null) {
        alert('Please pause the timer before changing modes');
        return;
    }
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'work' : 'coffee';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Initialize display
updateDisplay();
toggleButton.textContent = 'work'; 