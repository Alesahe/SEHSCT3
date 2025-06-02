// responsive navbar
function resizeNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "topnav") {
        x.className = "responsive topnav";
    } else {
        x.className = "topnav";
    }
}