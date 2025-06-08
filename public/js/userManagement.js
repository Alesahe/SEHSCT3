const registerForm = document.getElementById("registerForm");

console.log("halaaj sk");
registerForm.addEventListener("submit", async function(event) {
    console.log("hello?!!?!?");
    event.preventDefault(); // Prevent default form submission

    // Access form data
    // const firstname = firstnameInput.value;
    // const lastname = lastnameInput.value;
    // const username = usernameInput.value;
    // const email = emailInput.value;
    // const password = passwordInput.value;
    const firstname = document.getElementById("firstnameInput").value;
    const lastname = document.getElementById("lastnameInput").value;
    const username = document.getElementById("usernameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    // post request!!
    // post request code ADAPTED from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    console.log('here');
    await fetch("/registerUser", {
        method: "POST",
        body: JSON.stringify ({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        if(!response.ok){
            throw new Error("something went wrong ;-;");
        };
        const checkUsername = await response.json();
        return await response;
    })
});

// async functions
// (async () => {
//     await fetch("/registerUser", {
//         method: "POST",
//         body: JSON.stringify ({
//             firstname: firstname,
//             lastname: lastname,
//             username: username,
//             email: email,
//             password: password
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//     .then(async function(response){
//         if(!response.ok){
//             throw new Error("something went wrong ;-;");
//         };
//         const checkUsername = await response.json();
//         return await response;
//     })
// })();