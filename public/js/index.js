var textContent = [];

// load welcome page content from database
async function loadContent(){
    await fetch("/retrieveHTML", {
        method: "POST",
        body: JSON.stringify ({}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        if(!response.ok){
            throw new Error("retrieve html post request didnt work");
        };
        
        textContent = await response.json();
        console.log(textContent);
        console.log(textContent[0]);
    })
    document.getElementById("welcomePageText").innerHTML = textContent[4];
    document.getElementById("aboutMeText").innerHTML = textContent[0];
    document.getElementById("resumeText").innerHTML = textContent[3];
    document.getElementById("openingHoursText").innerHTML = textContent[1];
    document.getElementById("ratioText").innerHTML = textContent[2];
}