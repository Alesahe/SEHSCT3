var textContent = [];

async function loadContent(){
    // document.getElementById("welcomePageText").innerHTML = localStorage.getItem("welcomePageText");
    // document.getElementById("aboutMeText").innerHTML = localStorage.getItem("aboutMeText");
    // document.getElementById("resumeText").innerHTML = localStorage.getItem("resumeText");
    // document.getElementById("openingHoursText").innerHTML = localStorage.getItem("openingHoursText");
    // document.getElementById("ratioText").innerHTML = localStorage.getItem("ratioText");

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
    // res.json([rows[0].aboutMeText, rows[0].openingHoursText, rows[0].ratioText, rows[0].resumeText, rows[0].welcomePageText]);


    // console.log(welcomePageText);
    // console.log(localStorage.getItem("welcomePageText"));
}