let slideIndex = 1;
showSlides(slideIndex);

// add retrieved photos to photo gallery
function displayPhotos(photoFilename){
  console.log("displayphotos");
  const newSlidesDiv = document.createElement("div");
  newSlidesDiv.classList.add("mySlides");

  const newImg = document.createElement("img");
  newImg.src = "../userUploads/images/"+photoFilename;
  newImg.style.width = "100%";

  newSlidesDiv.appendChild(newImg);
  document.getElementById("addUploads").appendChild(newSlidesDiv);
}

// retrieve uploaded photos
async function loadUploads (){
  // post request
  await fetch("/retrievePhotos", {
      method: "POST",
      body: JSON.stringify ({}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(async function(response){
      const photoFiles = await response.json();
      if(!response.ok){
          throw new Error("photo display no");
      };

      for (let i=0; i<photoFiles.length; i++){
        displayPhotos(photoFiles[i]);
      }
  })
}

// photo display mechanisms
// code adapted from https://www.w3schools.com/howto/howto_js_slideshow_gallery.asp
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}