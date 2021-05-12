// var countDownDate = new Date("Oct 7, 2021 10:00:00").getTime();

// var days, hours, minutes, seconds,count;

// var daysTimer = document.getElementByqId("dayTimer");
// var hoursTimer = document.getElementById("hourTimer");
// var minutesTimer = document.getElementById("minuteTimer");
// var secondsTimer = document.getElementById("secondTimer");


// var y = setInterval(function() {
//     var countClicker = document.getElementById("countClicker");

//     function loadDoc() {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 console.log(this.responseText)
//             count= this.responseText
//             countClicker.innerHTML = count
//             }
//         };
//         xhttp.open("GET", "get_counter", true);
//         xhttp.send();
//     }

//     loadDoc();
// }, 1000);

// var x = setInterval(function() {
//     var now = new Date().getTime();
//     var distance = countDownDate - now;

//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         dayTimer.innerHTML = days;
//         hourTimer.innerHTML = hours;
//         minuteTimer.innerHTML = minutes;
//         secondTimer.innerHTML = seconds;
// }, 1000);