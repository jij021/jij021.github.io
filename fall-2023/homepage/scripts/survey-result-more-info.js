// take a pic of the p5 canvas and show it in other divs (in the more info section) ------------------------------------------------------------------------------------------------------
let canvasDataURL;
function saveCanvasToImage1() {
    canvasDataURL = canvas.toDataURL('image/svg+xml');
    let imgContainer1 = document.querySelector("#duplicateCanvasContainer1");
    let img1 = document.createElement("img");
    img1.setAttribute("id", "canvas1");
    img1.src = canvasDataURL;
    imgContainer1.appendChild(img1);
}
function saveCanvasToImage2() {
    canvasDataURL = canvas.toDataURL('image/svg+xml');
    let imgContainer2 = document.querySelector("#duplicateCanvasContainer2");
    let img2 = document.createElement("img");
    img2.setAttribute("id", "canvas2");
    img2.src = canvasDataURL;
    imgContainer2.appendChild(img2);
}
function saveCanvasToImage3() {
    canvasDataURL = canvas.toDataURL('image/svg+xml');
    let imgContainer3 = document.querySelector("#duplicateCanvasContainer3");
    let img3 = document.createElement("img");
    img3.setAttribute("id", "canvas3");
    img3.src = canvasDataURL;
    imgContainer3.appendChild(img3);
}
function saveCanvasToImage4() {
    canvasDataURL = canvas.toDataURL('image/svg+xml');
    let imgContainer4 = document.querySelector("#duplicateCanvasContainer4");
    let img4 = document.createElement("img");
    img4.setAttribute("id", "canvas4");
    img4.src = canvasDataURL;
    imgContainer4.appendChild(img4);
}
function saveCanvasToImageFinal() {
    // get the data URL of the saved image
    canvasDataURL = canvas.toDataURL('image/svg+xml');
    let imgContainer5 = document.querySelector("#duplicateCanvasContainer5");
    let imgContainer6 = document.querySelector("#duplicateCanvasContainer6");
    let img5 = document.createElement("img");
    img5.setAttribute("id", "canvas5");
    img5.src = canvasDataURL;
    let img6 = document.createElement("img");
    img6.setAttribute("id", "canvas6");
    img6.src = canvasDataURL;

    imgContainer5.appendChild(img5);
    imgContainer6.appendChild(img6);
}

// save text response to example text bubble ------------------------------------------------------------------------------------------------------
let exampleText = document.querySelector("#exampleText");

let myRoll2 = getRandomInt(0, 4);
if(myRoll2 == 0){
    exampleText.innerHTML = "Home is born from <b>" + shortResponse + "</b>"; // Set text input as the content of the span
}
if(myRoll2 == 1){
    exampleText.innerHTML = "Home isn't complete without <b>" + shortResponse + "</b>"; 
}
if(myRoll2 == 2){
    exampleText.innerHTML = "Home is full of <b>" + shortResponse + "</b>"; 
}
if(myRoll2 == 3){
    exampleText.innerHTML = "Home is made from lots of <b>" + shortResponse + "</b>"; 
}

// showing the correct response in the scale ------------------------------------------------------------------------------------------------------
if(behavioralSum < 4){ document.querySelector("#b1").src = "images/houseParts/roof-1.svg" }
else if(behavioralSum == 4 || behavioralSum == 5){ document.querySelector("#b2").src = "images/houseParts/roof-2.svg" }
else if(behavioralSum == 6){ document.querySelector("#b3").src = "images/houseParts/roof-3.svg" }
else if(behavioralSum == 7 || behavioralSum == 8){ document.querySelector("#b4").src = "images/houseParts/roof-4.svg" }
else if(behavioralSum == 9 || behavioralSum == 10){ document.querySelector("#b5").src = "images/houseParts/roof-5.svg" }
if(physicalSum < 4){ document.querySelector("#p1").src = "images/houseParts/base-1.svg" }
else if(physicalSum == 4 || physicalSum == 5){ document.querySelector("#b2").src = "images/houseParts/base-2.svg" }
else if(physicalSum == 6){ document.querySelector("#b3").src = "images/houseParts/base-3.svg" }
else if(physicalSum == 7 || physicalSum == 8){ document.querySelector("#b4").src = "images/houseParts/base-4.svg" }
else if(physicalSum == 9 || physicalSum == 10){ document.querySelector("#b5").src = "images/houseParts/base-5.svg" }

if(socialSum < 4){ 
    document.querySelector("#s1").src = "images/houseParts/SOC-1.svg" 
}
else if(socialSum == 4 || socialSum == 5){ 
    if(CESum < 4){document.querySelector("#s2").src = "images/houseParts/CE-1.svg" }
    else if(CESum == 4 || CESum == 5){document.querySelector("#s2").src = "images/houseParts/CE-2.svg" }
    else if(CESum == 6){document.querySelector("#s2").src = "images/houseParts/CE-3.svg" }
    else if(CESum == 7 || CESum == 8){document.querySelector("#s2").src = "images/houseParts/CE-4.svg" }
    else if(CESum == 9 || CESum == 10){document.querySelector("#s2").src = "images/houseParts/CE-5.svg" }
}
else if(socialSum == 6){ 
    if(CESum < 4){document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-1.svg" }
    else if(CESum == 4 || CESum == 5){document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-2.svg" }
    else if(CESum == 6){document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-3.svg" }
    else if(CESum == 7 || CESum == 8){document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-4.svg" }
    else if(CESum == 9 || CESum == 10){document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-5.svg" }
}
else if(socialSum == 7 || socialSum == 8){ 
    if(CESum < 4){document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-1.svg" }
    else if(CESum == 4 || CESum == 5){document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-2.svg" }
    else if(CESum == 6){document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-3.svg" }
    else if(CESum == 7 || CESum == 8){document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-4.svg" }
    else if(CESum == 9 || CESum == 10){document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-5.svg" }
}
else if(socialSum == 9 || socialSum == 10){ 
    if(CESum < 4){document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-1.svg" }
    else if(CESum == 4 || CESum == 5){document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-2.svg" }
    else if(CESum == 6){document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-3.svg" }
    else if(CESum == 7 || CESum == 8){document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-4.svg" }
    else if(CESum == 9 || CESum == 10){document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-5.svg" }
}

if(CESum < 4){document.querySelector("#ce1").src = "images/houseParts/CE-1.svg" }
else if(CESum == 4 || CESum == 5){document.querySelector("#ce2").src = "images/houseParts/CE-2.svg" }
else if(CESum == 6){document.querySelector("#ce3").src = "images/houseParts/CE-3.svg" }
else if(CESum == 7 || CESum == 8){document.querySelector("#ce4").src = "images/houseParts/CE-4.svg" }
else if(CESum == 9 || CESum == 10){document.querySelector("#ce5").src = "images/houseParts/CE-5.svg" }


// scroll to top ------------------------------------------------------------------------------------------------------
function scrollToTop() {
    window.scrollTo(0, 0);
}