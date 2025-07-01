const loginForm = document.getElementById("loginForm");
const invalidMsg = document.getElementById("invalidMsg");

// display invalid credentials message
function invalidLogin(){
    invalidMsg.style.display = "block";
    invalidMsg.textContent = "Username and/or password was invalid.";
}

// handle login form submission
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    // form input
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // post request
    await fetch("/loginUser", {
        method: "POST",
        body: JSON.stringify ({
            username: username,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        const responseMSG = await response.json();
        if(!response.ok){
            throw new Error("yikes, login went wrong ;-;");
        };

        if (responseMSG==null){
            invalidLogin();
        } else {
            // redirect to /feedback + show correct buttons
            window.location.href = "/feedback";
            LIButton();
        }
    })
});
