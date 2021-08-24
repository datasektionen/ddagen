let ddagen = new Date("Oct 7, 2021 10:00:00");

function updateTime() {
    let now = new Date();
    let diff = ddagen.getTime() - now.getTime();

    updateID("cd-day", Math.floor(diff / (1000 * 60 * 60 * 24)));
    updateID("cd-hrs", Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    updateID("cd-min", Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    updateID("cd-sec", Math.floor((diff % (1000 * 60)) / 1000));
}

function updateID(id, value) {
    document.getElementById(id).innerHTML = value;
}

setInterval(() => {
    updateTime();
}, 1000);

window.onload = updateTime();