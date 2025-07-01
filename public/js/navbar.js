// implement responsive navbar
// code adapted from https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
function resizeNavbar() {
    const navbar = document.getElementById("navbar");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const feedbackButton = document.getElementById("feedbackButton");
    const adminButton = document.getElementById("adminButton");
    const logoutButton = document.getElementById("logoutButton");

    if (navbar.className === "topnav") {
        navbar.className = "responsive topnav";
        loginButton.style.cssFloat = "left";
        loginButton.style.width = "100%";
        registerButton.style.cssFloat = "left";
        registerButton.style.width = "100%";

        feedbackButton.style.cssFloat = "left";
        feedbackButton.style.width = "100%";
        adminButton.style.cssFloat = "left";
        adminButton.style.width = "100%";
        logoutButton.style.cssFloat = "left";
        logoutButton.style.width = "100%";
    } else {
        navbar.className = "topnav";
        loginButton.style.cssFloat = "";
        loginButton.style.width = "";
        registerButton.style.cssFloat = "";
        registerButton.style.width = "";

        feedbackButton.style.cssFloat = "";
        feedbackButton.style.width = "";
        adminButton.style.cssFloat = "";
        adminButton.style.width = "";
        logoutButton.style.cssFloat = "";
        logoutButton.style.width = "";
    }
}