// code adapted from https://www.geeksforgeeks.org/javascript/star-rating-using-html-css-and-javascript/
let stars = document.getElementsByClassName("star");
let rating = document.getElementById("rating");

// Funtion to update rating
function updateColour(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
        rating.innerText = n;
    }
}
// To remove the pre-applied styling
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}