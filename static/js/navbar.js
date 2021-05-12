// Makes it so that the header doesn't hide the page content.
window.onload = function () {
    let height = document.getElementById("navigation-bar").offsetHeight;
    document.getElementById("page-content").style.marginTop = height + "px";
}