// import 'boxicons';
const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const dashboardButton = document.getElementById("dashboardButton");
const logoutButton = document.getElementById("logoutButton");

export function LIButton(){
    registerButton.style.display = "none";
    loginButton.style.display = "none";
    dashboardButton.style.display = "block";
    logoutButton.style.display = "block";
}

export function LOButton(){
    registerButton.style.display = "block";
    loginButton.style.display = "block";
    dashboardButton.style.display = "none";
    logoutButton.style.display = "none";
}