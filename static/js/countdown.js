let ddagen = new Date("Oct 7, 2021 10:00:00");
let intervalID;

/**
 * No, this is not the most efficent or pretty way to do this. But it works.
 */
function updateTime() {
    let now = new Date();
    let diff = ddagen.getTime() - now.getTime();

    if (diff > 0) {
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days == 1) {
            updateID("day", "dag");
        } else {
            updateID("day", "dagar");
        }

        if (hours == 1) {
            updateID("hrs", "timme");
        } else {
            updateID("hrs", "timmar");
        }

        if (minutes == 1) {
            updateID("min", "minut");
        } else {
            updateID("min", "minuter");
        }

        if (seconds == 1) {
            updateID("sec", "sekund");
        } else {
            updateID("sec", "sekunder");
        }

        // Updateds the countdown numbers.
        updateID("cd-day", days);
        updateID("cd-hrs", hours);
        updateID("cd-min", minutes);
        updateID("cd-sec", seconds);
    } else {
        // Removes the countdown from the page when it has reached it's time.
        document.getElementById("countdown").remove();
        clearInterval(intervalID);
    }
}

function updateID(id, value) {
    try {
        document.getElementById(id).innerHTML = value;
    } catch (error) { }
}

intervalID = setInterval(() => {
    updateTime();
}, 1000);

window.onload = updateTime();