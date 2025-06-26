let slideIndex = 1;
showSlides(slideIndex);

// const addUploads = document.getElementById("addUploads");
// function loadUploads (){
//   const uploadedPhotos = JSON.parse(localStorage.getItem("displayPhotos"));
//   for (let i=0; i<uploadedPhotos.length; i++){
//     const newSlidesDiv = document.createElement("div");
//     newSlidesDiv.classList.add("mySlides");

//     const newImg = document.createElement("img");
//     img.src = uploadedPhotos[i];
//     newImg.style.width = "100%";

//     newSlidesDiv.appendChild(img);
//     document.getElementById("addUploads").appendChild(newSlidesDiv);
//   }
// }

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

async function loadUploads (){
  await fetch("/retrievePhotos", {
      method: "POST",
      body: JSON.stringify ({}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(async function(response){
      const photoFiles = await response.json();
      console.log(photoFiles);
      if(!response.ok){
          throw new Error("photo display no");
      };

      for (let i=0; i<photoFiles.length; i++){
        displayPhotos(photoFiles[i]);
        // console.log(photoFiles[i]);
      }
  })
}

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