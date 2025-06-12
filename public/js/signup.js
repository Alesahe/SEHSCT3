const registerForm = document.getElementById("registerForm");
const userTaken = document.getElementById("userTaken");
const successMsg = document.getElementById("successMsg");
// console.log("halaaj sk");

function usernameTaken (){
    userTaken.style.display = "block";
    userTaken.textContent = "Username already taken.";
}

function registerSuccess(){
    successMsg.style.display = "block";
    successMsg.textContent = "Account was registered.";
}

//signup form submit
registerForm.addEventListener("submit", async function(event) {
    // console.log("hello?!!?!?");
    event.preventDefault();

    // yomp chomp form inputs :D
    const firstname = document.getElementById("firstnameInput").value;
    const lastname = document.getElementById("lastnameInput").value;
    const username = document.getElementById("usernameInput").value;
    // const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    // post requests...
    // code ADAPTED from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    // check if same username is alr taken
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
            // console.log(response);
        };
        const numUsers = await response.json();
        if (numUsers>0) usernameTaken();
        else {
            // register the user
            await fetch("/registerUser", {
                method: "POST",
                body: JSON.stringify ({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    // email: hashInput(email),
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
                // const checkUsername = await response.json();
                return await response;
            })
        }
    })

    // reset form data + success message
    registerSuccess();
    registerForm.reset(); 
    return false;
});