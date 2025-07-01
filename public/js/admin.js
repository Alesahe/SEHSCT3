const websiteEdits = document.getElementById("websiteEdits");
const galleryPhotoUpload = document.getElementById("galleryPhotoUpload");
const changesSaved = document.getElementById("changesSaved");

// shows success message
function submissionSuccess(){
    changesSaved.style.display = "block";
}

// changes HTML after form submission
websiteEdits.addEventListener("submit", async function(event) {
    event.preventDefault();

    // form input
    var welcomePageText = document.getElementById("welcomePageText").value;
    var aboutMeText = document.getElementById("aboutMeText").value;
    var resumeText = document.getElementById("resumeText").value;
    var openingHoursText = document.getElementById("openingHoursText").value;
    var ratioText = document.getElementById("ratioText").value;

    // post request
    // all post request code adapted from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    await fetch("/changeHTML", {
        method: "POST",
        body: JSON.stringify ({
            welcomePageText: welcomePageText,
            aboutMeText: aboutMeText,
            resumeText: resumeText,
            openingHoursText: openingHoursText,
            ratioText: ratioText
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        if(!response.ok){
            throw new Error("update html post request didnt work");
        };
        return await response;
    })

    // success message
    submissionSuccess();
});

// load text from database
async function loadInputText(){
    // post request
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
    })

    // alter element content
    document.getElementById("welcomePageText").innerHTML = textContent[4];
    document.getElementById("aboutMeText").innerHTML = textContent[0];
    document.getElementById("resumeText").innerHTML = textContent[3];
    document.getElementById("openingHoursText").innerHTML = textContent[1];
    document.getElementById("ratioText").innerHTML = textContent[2];
}