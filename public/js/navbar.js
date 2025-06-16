// responsive navbar
function resizeNavbar() {
    const navbar = document.getElementById("navbar");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    if (navbar.className === "topnav") {
        navbar.className = "responsive topnav";
        loginButton.style.cssFloat = "left";
        loginButton.style.width = "100%";

        registerButton.style.cssFloat = "left";
        registerButton.style.width = "100%";
    } else {
        navbar.className = "topnav";
        loginButton.style.cssFloat = "";
        loginButton.style.width = "";

        registerButton.style.cssFloat = "";
        registerButton.style.width = "";
    }
}