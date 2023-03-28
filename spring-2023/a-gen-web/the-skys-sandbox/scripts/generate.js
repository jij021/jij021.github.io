// hero sketch
var sketches = [];
sketches[0] = new p5(sketch);

// static sketch base
var sketchesStatic = [];
sketchesStatic[0] = new p5(sketch2);

// making the divs where the images and numbers will be held
for(var num = 1; num < 51; num++){
    var myDiv = document.createElement("div");
    myDiv.setAttribute("id", "div" + num);
    myDiv.classList.add("div-grid");
    document.getElementById("static-grid").appendChild(myDiv);

    var p = document.createElement("p");
    p.innerText = num;
    p.classList.add("numbers");
    document.getElementById("div" + num).appendChild(p);
}

// to count the correct div to put the images in
var count = 1;
// count the number of images on the site
var numImages = 0;

// check if the images are still loading in the grid, and if they are, disable the generate more button and change it to loading
setInterval(() => {
  numImages = document.querySelectorAll("img").length;
  if(numImages == 53){
    document.querySelector("button").style.backgroundColor = "#0E0E0E";
    document.querySelector("button").style.color = "white";
    document.querySelector("button").innerText = "Generate new skies";
    document.querySelector("button").onmouseover = function() {
      document.querySelector("button").style.backgroundColor = "white";
      document.querySelector("button").style.color = "#0E0E0E";
    }
  } else {
    document.querySelector("button").style.backgroundColor = "white";
    document.querySelector("button").style.color = "#0E0E0E";
    document.querySelector("button").innerText = "Loading skies...";
  }
}, 2000);

function generate() {
  if(numImages == 53){
    // deletes and replaces the animated sketch with a new one
    document.getElementById("defaultCanvas0").remove();
    sketches.splice(0, 1);
    document.querySelectorAll('.image-grid').forEach(e => e.remove());
    document.getElementById("defaultCanvas1").remove();
    sketchesStatic.splice(0, 1);

    sketches = [];
    sketches[0] = new p5(sketch);
    sketchesStatic = [];
    sketchesStatic[0] = new p5(sketch2);
    count = 1;
    numImages = 0;
  }
}

function addImages() {
  // select the canvas we want to sc from
  let canv = document.getElementById("defaultCanvas1");

  // store the dataurl of the current canvas state
  setTimeout(()=>{
    var jpegURL = canv.toDataURL("image/png");

    // make a new image, assign the dataURL as an arc, and append the img to the static images grid
    var img = document.createElement("img");
    img.src = jpegURL;
    img.classList.add("image-grid");
    document.getElementById("div" + count).appendChild(img);
    count++;
  }, 333);
}