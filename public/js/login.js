const loginForm = document.getElementById("loginForm");
const invalidMsg = document.getElementById("invalidMsg");

function invalidLogin(){
    invalidMsg.style.display = "block";
    invalidMsg.textContent = "Username and/or password was invalid.";
}

loginForm.addEventListener("submit", async function(event) {
    console.log("i exist!!!")
    event.preventDefault();

    // yomp chomp form input
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // post request!!
    // code ADAPTED from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    console.log('still alive');
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
        if(!response.ok){
            throw new Error("yikes, login went wrong ;-;");
        };
        // const checkUsername = await response.json();
        if (response==-1){
            invalidLogin();
        } else {
            window.location.href = "/dashboard";
        }
        return await response;
    })
});
