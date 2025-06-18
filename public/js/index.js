function loadContent(){
    document.getElementById("welcomePageText").innerHTML = localStorage.getItem("welcomePageText");
    document.getElementById("aboutMeText").innerHTML = localStorage.getItem("aboutMeText");
    document.getElementById("resumeText").innerHTML = localStorage.getItem("resumeText");
    document.getElementById("openingHoursText").innerHTML = localStorage.getItem("openingHoursText");
    document.getElementById("ratioText").innerHTML = localStorage.getItem("ratioText");

    // console.log(welcomePageText);
    // console.log(localStorage.getItem("welcomePageText"));
}