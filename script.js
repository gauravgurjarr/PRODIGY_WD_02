// DOM Elements
const display = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds')
};
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

// Variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

// Format time components with leading zeros
function formatComponent(time, length) {
    return String(time).padStart(length, '0');
}

// Update the display
function updateDisplay(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    
    display.hours.textContent = formatComponent(hours, 2);
    display.minutes.textContent = formatComponent(minutes, 2);
    display.seconds.textContent = formatComponent(seconds, 2);
    display.milliseconds.textContent = formatComponent(milliseconds, 2);
}

// Start the stopwatch
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        isRunning = true;
        
        // Add glowing effect
        document.querySelectorAll('.digit').forEach(digit => {
            digit.style.textShadow = '0 0 10px #0f0';
        });
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Remove glowing effect
        document.querySelectorAll('.digit').forEach(digit => {
            digit.style.textShadow = 'none';
        });
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    lapTimes.innerHTML = '<div class="lap-item">No lap times recorded</div>';
    lapCount = 1;
    
    // Remove glowing effect
    document.querySelectorAll('.digit').forEach(digit => {
        digit.style.textShadow = 'none';
    });
}

// Record a lap time
function lap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-item';
        
        const hours = display.hours.textContent;
        const minutes = display.minutes.textContent;
        const seconds = display.seconds.textContent;
        const milliseconds = display.milliseconds.textContent;
        
        lapTime.textContent = `Lap ${lapCount++}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
        
        if (lapTimes.firstChild?.textContent === 'No lap times recorded') {
            lapTimes.innerHTML = '';
        }
        
        lapTimes.prepend(lapTime);
    }
}

// Event Listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize display
updateDisplay(elapsedTime);
lapTimes.innerHTML = '<div class="lap-item">No lap times recorded</div>';