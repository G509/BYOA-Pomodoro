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
const addFiveButton = document.getElementById('add-five');

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

function toggleTimer() {
    if (timerId === null) {
        if (isWorkTime) {
            // Show the modal for focus task input
            const modal = document.getElementById('focus-modal');
            const focusInput = document.getElementById('focus-input');
            const submitButton = document.getElementById('focus-submit');
            const closeButton = document.querySelector('.close-button');

            modal.style.display = 'block';

            submitButton.onclick = function() {
                const focusTask = focusInput.value;
                if (focusTask) {
                    const focusTaskDisplay = document.getElementById('focus-task-display');
                    focusTaskDisplay.textContent = `Focus: ${focusTask}`;
                    focusTaskDisplay.classList.add('focus-task-spacing');
                    modal.style.display = 'none';
                    
                    // Start the timer
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
                            startButton.textContent = 'Start';
                        }
                    }, 1000);
                    startButton.textContent = 'Pause';
                }
            };

            closeButton.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };

            return; // Exit to wait for user input
        }
        
        // Start the timer if it's break time
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
                startButton.textContent = 'Start';
            }
        }, 1000);
        startButton.textContent = 'Pause';
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
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
    toggleButton.textContent = isWorkTime ? 'coffee' : 'work';
    updateDisplay();
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes in seconds
    updateDisplay(); // Update the display immediately
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);
addFiveButton.addEventListener('click', addFiveMinutes);

// Initialize display
updateDisplay();
toggleButton.textContent = 'work'; 