var loggedIn;
const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const feedbackButton = document.getElementById("feedbackButton");
const logoutButton = document.getElementById("logoutButton");

function LIButton(){
    registerButton.style.display = "none";
    loginButton.style.display = "none";
    feedbackButton.style.display = "block";
    logoutButton.style.display = "block";
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
        loggedIn = await response.json();
        if(!response.ok){
            throw new Error("login button displaying went wrong ;-;");
        };
        console.log("loggedinhere!")
    })


    if (loggedIn) LIButton();
    else LOButton();
    console.log("ASDFASD");
}