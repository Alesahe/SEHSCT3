const registerForm = document.getElementById("registerForm");
const userTaken = document.getElementById("userTaken");
const successMsg = document.getElementById("successMsg");

// display error message for duplicate username
function usernameTaken (){
    userTaken.style.display = "block";
    userTaken.textContent = "Username already taken.";
}

// display successful registration message
function registerSuccess(){
    successMsg.style.display = "block";
    successMsg.textContent = "Account was registered.";
}

//signup form submit
registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    // form inputs
    const firstname = document.getElementById("firstnameInput").value;
    const lastname = document.getElementById("lastnameInput").value;
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // post requests
    // code ADAPTED from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    await fetch("/sameUser", {
        method: "POST",
        body: JSON.stringify ({
            username: username
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        if(!response.ok){
            throw new Error("same user went wrong ;-;");
        };

        const numUsers = await response.json();
        if (numUsers>0) usernameTaken();
        else {
            // nested post request
            await fetch("/registerUser", {
                method: "POST",
                body: JSON.stringify ({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(async function(response){
                if(!response.ok){
                    throw new Error("register user went wrong ;-;");
                };
                return await response;
            })
        
            // reset form data + success message
            registerSuccess();
            registerForm.reset(); 
            return false;
        }
    })
});