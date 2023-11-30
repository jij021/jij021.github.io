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


// scroll to top ------------------------------------------------------------------------------------------------------
function scrollToTop() {
    window.scrollTo(0, 0);
}