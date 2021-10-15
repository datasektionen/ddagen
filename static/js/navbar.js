// Makes it so that the header doesn't hide the page content.
function addNavbarMargin() {
    let height = document.getElementById("navbar").offsetHeight;
    document.getElementById("page-content").style.marginTop = height + "px";
}

function toggleDropdown() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className += "responsive";
    } else {
        x.className = "";
    }
}