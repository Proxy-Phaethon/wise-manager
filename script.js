// for time
function updateTime () {
    const now = new Date ();
    const hours = now.getHours ().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    document.getElementById("timeDisplay").textContent = `${hours}:${minutes}:${seconds}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateTime();
    setInterval(updateTime, 1000);
});

// For date
function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById("dateDisplay").textContent = dateString;
}

document.addEventListener("DOMContentLoaded", updateDate);

//for weather
async function updateWeather() {
    const apiKey = "0b30d4b1eac435b446ab794435f26f7d"; 
    const city = "London";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");
        
        const data = await response.json();
        const temp = Math.round(data.main.temp); 
        const condition = data.weather[0].main; 
        
        const weatherIcons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Drizzle: "🌦️",
            Mist: "🌫️"
        };
        
        const icon = weatherIcons[condition] || "🌍"; 

        document.getElementById("weatherDisplay").textContent = `${icon} ${temp}°C`;
    } catch (error) {
        console.error("Weather fetch error:", error);
        document.getElementById("weatherDisplay").textContent = "❌ Error";
    }
}

document.addEventListener("DOMContentLoaded", updateWeather);

//progress bar progress
function updateProgress() {
    const tasks = document.querySelectorAll(".task-checkbox");
    const completedTasks = document.querySelectorAll(".task-checkbox:checked").length;
    const totalTasks = tasks.length;

    let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById("taskProgress").value = progress;
    document.getElementById("progressText").textContent = `${Math.round(progress)}%` ;
}

document.querySelectorAll(".task-checkbox").forEach(task => {
    task.addEventListener("change", updateProgress);
});

updateProgress ();

//calendar
const calendarGrid = document.getElementById("calendarGrid");
const currentMonthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {
    calendarGrid.innerHTML = ""; 

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    currentMonthYear.textContent = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        let dayLabel = document.createElement("div");
        dayLabel.classList.add("day-label");
        dayLabel.textContent = day;
        calendarGrid.appendChild(dayLabel);
    });

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("div");
        emptyCell.classList.add("empty-day");
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDate; day++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.textContent = day;

        let today = new Date();
        if (day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
            dayCell.classList.add("today");
        }

        calendarGrid.appendChild(dayCell);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.addEventListener("DOMContentLoaded", renderCalendar);

//pomodoro timer
document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timer-display");
    const startBtn = document.getElementById("start-btn");

    let timeLeft = 25 * 60;
    let breakTime = 5 * 60;
    let isBreak = false;
    let timerInterval;

    function updateDisplay(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startTimer(duration, onEnd) {
        clearInterval(timerInterval);
        let currentTime = duration;

        startBtn.disabled = true;

        timerInterval = setInterval(() => {
            updateDisplay(currentTime);
            currentTime--;

            if (currentTime < 0) {
                clearInterval(timerInterval);
                onEnd();
            }
        }, 1000);
    }

    startBtn.addEventListener("click", () => {
        isBreak = false;
        startTimer(timeLeft, () => {
            isBreak = true;
            startBtn.textContent = "Break Time";
            startBtn.disabled = true;
            startTimer(breakTime, () => {
                startBtn.textContent = "Start";
                startBtn.disabled = false;
                updateDisplay(timeLeft);
            });
        });
    });

    updateDisplay(timeLeft);
});
