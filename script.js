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