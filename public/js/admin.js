const websiteEdits = document.getElementById("websiteEdits");
// const galleryPhotoUpload = document.getElementById("galleryPhotoUpload");
const changesSaved = document.getElementById("changesSaved");

function submissionSuccess(){
    changesSaved.style.display = "block";
}

websiteEdits.addEventListener("submit", async function(event) {
    event.preventDefault();

    // yomp chomp form input
    var welcomePageText = document.getElementById("welcomePageText").value;
    var aboutMeText = document.getElementById("aboutMeText").value;
    var resumeText = document.getElementById("resumeText").value;
    var openingHoursText = document.getElementById("openingHoursText").value;
    var ratioText = document.getElementById("ratioText").value;

    localStorage.setItem("welcomePageText", welcomePageText);
    localStorage.setItem("aboutMeText", aboutMeText);
    localStorage.setItem("resumeText", resumeText);
    localStorage.setItem("openingHoursText", openingHoursText);
    localStorage.setItem("ratioText", ratioText);

    //it worked!!
    submissionSuccess();
    console.log(welcomePageText);
    console.log(localStorage.getItem("welcomePageText"));
});

// galleryPhotoUpload.addEventListener("submit", async function(event) {
//     event.preventDefault();

//     // const photoInput = document.getElementById("photoInput").file.filename;

//     console.log("ahusd");
//     await fetch("/addPhotoLS", {
//         method: "POST",
//         body: JSON.stringify ({}),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//     .then(async function(response){
//         const strUploads = await response.json();
//         // console.log("hello");
//         if(!response.ok){
//             throw new Error("admin photo upload didnt work");
//         };
//         // localStorage.setItem("displayPhotos", strUploads);
//     })
// });

function loadInputText(){
    document.getElementById("welcomePageText").value = localStorage.getItem("welcomePageText");
    document.getElementById("aboutMeText").value = localStorage.getItem("aboutMeText");
    document.getElementById("resumeText").value = localStorage.getItem("resumeText");
    document.getElementById("openingHoursText").value = localStorage.getItem("openingHoursText");
    document.getElementById("ratioText").value = localStorage.getItem("ratioText");

    // console.log(welcomePageText);
    // console.log(localStorage.getItem("welcomePageText"));
}