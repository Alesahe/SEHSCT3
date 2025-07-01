const feedbackForm = document.getElementById("feedbackForm");
const submittedMsg = document.getElementById("submittedMsg");

// displays success message
function submissionSuccess(){
    submittedMsg.style.display = "block";
    submittedMsg.textContent = "Feedback submitted.";
}

// adds feedback to database on form submission
feedbackForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    // form input
    const rating = document.getElementById("rating").textContent;
    console.log(rating);
    console.log(Number(rating));
    const feedback = document.getElementById("feedbackInput").value;

    // post request
    await fetch("/giveFeedback", {
        method: "POST",
        body: JSON.stringify ({
            starRating: Number(rating),
            feedback: feedback
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(async function(response){
        if(!response.ok){
            throw new Error("feedback submision went wrong ;-;");
        };
        console.log("feedback subimssion prolly worked??");
        return await response;
    })

    //clear form data + tell user it worked
    submissionSuccess();
    feedbackForm.reset(); 
    return false;
});
