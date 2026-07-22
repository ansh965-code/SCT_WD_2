const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");

console.log("lapList:", lapList);

let hr = 0;
let min = 0;
let sec = 0;
let ms = 0;

let timer = null;
let lapCount = 1;

function updateDisplay() {
    hours.textContent = String(hr).padStart(2, "0");
    minutes.textContent = String(min).padStart(2, "0");
    seconds.textContent = String(sec).padStart(2, "0");
    milliseconds.textContent = String(ms).padStart(2, "0");
}

updateDisplay();

function stopwatch() {
    ms++;

    if (ms >= 100) {
        ms = 0;
        sec++;
    }

    if (sec >= 60) {
        sec = 0;
        min++;
    }

    if (min >= 60) {
        min = 0;
        hr++;
    }

    updateDisplay();
}

startBtn.onclick = () => {
    if (timer) return;
    timer = setInterval(stopwatch, 10);
};

pauseBtn.onclick = () => {
    clearInterval(timer);
    timer = null;
};

resetBtn.onclick = () => {
    clearInterval(timer);
    timer = null;

    hr = min = sec = ms = 0;
    lapCount = 1;

    updateDisplay();

    if (lapList) {
        lapList.innerHTML = "";
    }
};

lapBtn.onclick = () => {
    if (!timer) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${hours.textContent}:${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}</span>
    `;

    lapList.prepend(li);
    lapCount++;
};