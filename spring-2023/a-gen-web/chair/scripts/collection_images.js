let bg = document.querySelector("#bg");
let bgButton = document.querySelector("#closeBg");
let imgContainer = document.querySelector("#expandedImg");
let expandedImgArray = [];
let imageNumber;

setTimeout(() => {
    let collectionImages = document.querySelectorAll(".image-container");
    collectionImages = Array.from(collectionImages);

    // make an array of images to retrieve when we expand the pics
    for(let i = 0; i < collectionImages.length; i++){
        let clone = document.querySelector("#image" + i).cloneNode(true);
        expandedImgArray.push(clone);
        expandedImgArray[i].classList.remove("chair-images");
        expandedImgArray[i].classList.add("big-chair-images");
        expandedImgArray[i].removeAttribute("id");
    }
    console.log(expandedImgArray);

    collectionImages.forEach(function(item) {
        item.addEventListener('click', function() {
            // show the container with the expanded image
            focusItem();
        });
    });

    collectionImages.forEach(function(item) {
        item.addEventListener('click', function(number) {
            // get the class number
            let chairClass = number.target.className[13];
            console.log(chairClass);

            // go through all the images in the images array and check which of them matches the chairClass, breaking when we find it
            for(let i = 0; i < collectionImages.length; i++){
                // set all the images that are NOT the correct chair class number to none
                // clears out the expandedImg div
                imgContainer.innerHTML = '';
                if(chairClass == i){
                    imageNumber = i;
                    // fetch the correct image from the array of images we made
                    imgContainer.appendChild(expandedImgArray[imageNumber]);
                    break;
                }
            }
        });
    });
}, 1300);

var bigImage = document.querySelector(".big-chair-images");

function focusItem() {
    if (bg.style.display === "block") {
        // hide the image containers
        bg.style.display = "none";
        // bgButton.style.display = "none";
        imgContainer.style.display = "none";
    } else {
        // show the image containers
        bg.style.display = "block";
        // bgButton.style.display = "block";
        imgContainer.style.display = "block";

        // when the user clicks outside of the picture, it will close out
        setTimeout(() => {
            // Detect all clicks on the document
            document.addEventListener("click", function(event) {
                // If user clicks inside the element, do nothing
                if (event.target.closest(".big-chair-images")) return;
                bg.style.display = "none";
                imgContainer.style.display = "none";
            });
        }, 10);

        // allow for the images to show up again
        setTimeout(() => {
            // show the image containers
            bg.style.display = "block";
            // bgButton.style.display = "block";
            imgContainer.style.display = "block";
        }, 10);
    }
}