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
