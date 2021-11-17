let ddagen = new Date("Oct 7, 2021 10:00:00");

function tick() {
    now = new Date();
    diff = ddagen.getTime() - now.getTime();

    // ternary operator: 
    // condition ? exprIfTrue : exprIfFalse
    diff >= 0 ? timeTo(diff) : remove();
}

// No, this is not the most efficent or pretty way to do this. But it works.
function timeTo(time) {
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    let d = ["day", "dagar"];
    let h = ["hrs", "timmar"];
    let m = ["min", "minuter"];
    let s = ["sec", "sekunder"];

    days == 1 ? d[1] = "dag" : false;
    hours == 1 ? h[1] = "timme" : false;
    minutes == 1 ? m[1] = "minut" : false;
    seconds == 1 ? s[1] = "sekund" : false;

    let updateID = (id, text) => document.getElementById(id).innerHTML = text;

    updateID(d[0], d[1]);
    updateID(h[0], h[1]);
    updateID(m[0], m[1]);
    updateID(s[0], s[1]);

    updateID("cd-day", days);
    updateID("cd-hrs", hours);
    updateID("cd-min", minutes);
    updateID("cd-sec", seconds);
}

function remove() {
    try {
        document.getElementById("countdown").remove();
        clearInterval(intervalID);
    } catch (error) { }
}

window.onload = () => {
    if (document.getElementById("countdown") == null) {
        remove();
        return;
    }
    
    tick();
    var intervalID = setInterval(() => { tick(); }, 1000);
};