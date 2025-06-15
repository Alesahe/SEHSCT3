const feedbackForm = document.getElementById("feedbackForm");
const submittedMsg = document.getElementById("submittedMsg");

function submissionSuccess(){
    submittedMsg.style.display = "block";
    submittedMsg.textContent = "Feedback submitted.";
}

feedbackForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    // yomp chomp form input
    const rating = document.getElementById("rating").textContent;
    console.log(rating);
    console.log(Number(rating));
    const feedback = document.getElementById("feedbackInput").value;

    // post request!!
    // code ADAPTED from https://www.geeksforgeeks.org/how-to-send-an-http-post-request-in-js/
    // console.log('still alive');
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
            throw new Error("feedbacj submision went wrong ;-;");
        };
        console.log("feedbakc subimssion prolly worked??");
        return await response;
    })

    //clear form data + tell user it worked
    submissionSuccess();
    feedbackForm.reset(); 
    return false;
});
