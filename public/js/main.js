var loggedIn;
var userAdmin;
const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const feedbackButton = document.getElementById("feedbackButton");
const logoutButton = document.getElementById("logoutButton");
const adminButton = document.getElementById("adminButton");

// display the right buttons if user is logged in
document.addEventListener("DOMContentLoaded", function(event) {
    loginButtonDisplay();
});

// displaying logged in buttons
function LIButton(){
    registerButton.style.display = "none";
    loginButton.style.display = "none";
    feedbackButton.style.display = "block";
    logoutButton.style.display = "block";
    if (userAdmin) adminButton.style.display = "block";
}

// displaying logged out buttons
function LOButton(){
    registerButton.style.display = "block";
    loginButton.style.display = "block";
    feedbackButton.style.display = "none";
    logoutButton.style.display = "none";
}

// retrieve session details to display correct buttons
async function loginButtonDisplay(){
    // post request
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
    })

    // calls corresponding function
    if (loggedIn) LIButton();
    else LOButton();
}