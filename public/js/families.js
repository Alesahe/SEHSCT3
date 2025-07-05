const reviewContainer = document.getElementById("reviewContainer");

// returns string of n stars
function numToStar(n){
    if (n==1) return "★";
    else if (n==2) return "★★";
    else if (n==3) return "★★★";
    else if (n==4) return "★★★";
    else return "★★★★★";
}

// displays review from database
async function displayReviews(){
    // post request
    await fetch("/retrieveReviews", {
        method: "POST",
        body: JSON.stringify ({}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        const allReviews = await response.json();
        if(!response.ok){
            throw new Error("yikes, displaying results went wrong ;-;");
        };

        // display retrieved reviews
        for (let i=0; i<allReviews.length; i++){
            var newReviewBox = document.createElement("div");
            newReviewBox.classList.add("reviewBox");

            var stars = document.createElement("p");
            stars.innerHTML = numToStar(allReviews[i][1]);
            var username = document.createElement("p");
            username.innerHTML = "User: " + allReviews[i][0];
            var comments = document.createElement("p");
            comments.innerHTML = allReviews[i][2];

            newReviewBox.appendChild(stars);
            newReviewBox.appendChild(username);
            newReviewBox.appendChild(comments);
            reviewContainer.appendChild(newReviewBox);
        }
    })
}