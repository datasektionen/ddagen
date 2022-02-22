let ddagen = new Date("Oct 13, 2022 10:00:00");
let lang = getLang();

function tick() {
    now = new Date();
    diff = ddagen.getTime() - now.getTime();

    // ternary operator: 
    // condition ? exprIfTrue : exprIfFalse
    diff >= 0 ? timeTo(diff) : remove();
}

function getLang() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let lang = urlParams.get("language");
    if (lang)
        return lang
    else
        return "sv"
}

function timeTo(time) {
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    let str = {
        d: {
            id: "day",
            sv: days == 1 ? "dag" : "dagar",
            en: days == 1 ? "day" : "days"
        },
        h: {
            id: "hrs",
            sv: hours == 1 ? "timme" : "timmar",
            en: hours == 1 ? "hour" : "hours"
        },
        m: {
            id: "min",
            sv: minutes == 1 ? "minut" : "minuter",
            en: minutes == 1 ? "minute" : "minutes"
        },
        s: {
            id: "sec",
            sv: seconds == 1 ? "sekund" : "sekunder",
            en: seconds == 1 ? "second" : "seconds"
        }
    }

    let updateID = (id, text) => document.getElementById(id).innerHTML = text;

    updateID(str.d.id, str.d[lang]);
    updateID(str.h.id, str.h[lang]);
    updateID(str.m.id, str.m[lang]);
    updateID(str.s.id, str.s[lang]);

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