var loggedIn;
var userAdmin;
const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const feedbackButton = document.getElementById("feedbackButton");
const logoutButton = document.getElementById("logoutButton");
const adminButton = document.getElementById("adminButton");

document.addEventListener("DOMContentLoaded", function(event) {
    loginButtonDisplay();
});

// document.onload()

function LIButton(){
    registerButton.style.display = "none";
    loginButton.style.display = "none";
    feedbackButton.style.display = "block";
    logoutButton.style.display = "block";
    if (userAdmin) adminButton.style.display = "block";
}

function LOButton(){
    registerButton.style.display = "block";
    loginButton.style.display = "block";
    feedbackButton.style.display = "none";
    logoutButton.style.display = "none";
}

async function loginButtonDisplay(){
    await fetch("/loggedIn", {
        method: "POST",
        body: JSON.stringify ({}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        const LIUA = await response.json();
        loggedIn = LIUA[0];
        userAdmin = LIUA[1];
        if(!response.ok){
            throw new Error("login button displaying went wrong ;-;");
        };

        console.log("LI:" + loggedIn);
        console.log("UA:" + userAdmin);
        console.log(LIUA);
    })


    if (loggedIn) LIButton();
    else LOButton();
    console.log("login button display happened");
}