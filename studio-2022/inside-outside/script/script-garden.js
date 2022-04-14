console.log("hello world");

// airtable data -------------------------------------------

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyzO8HNBKPW555xb'}).base('appJSCdd9N93mXE0I');

console.log(Airtable);

// get the "Cool-Images" table from the base, select ALL the items
base("Cool-Images").select({}).eachPage(gotPageOfImages, gotAllImages);

// an empty array to hold our Images data
let images = [];

// callback function that receives our data
function gotPageOfImages(records, fetchNextPage) {
    console.log("gotPageOfImages");
    // add the records from this page to our images array
    images.push(...records);
    // request more pages
    fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllImages(err) {
    console.log("gotAllImages()");

    // report an error
    if(err) {
        console.log("error loading images");
        console.error(err);
        return;
    }

    // call functions to log and show the books
    consoleLogImages();
    showImages();
}

function consoleLogImages() {
    console.log("consoleLogImages()");
    images.forEach((image) => {
        console.log("Images:", image);
    })
}

console.log(images);

// create the ads
function showImages() {
  console.log("showImages()");

  // look for the ad-section figure element
  const adSection = document.querySelector(".nature-figure");
  
  // loop through the images loaded from the Airtable API
  images.forEach((image) => {
    // make an img and add the "ad-image" class
    const img = document.createElement("img");
    img.classList.add("ad-image");
    img.src = image.fields.attachments[0].url;

    // put the img tags into the figure
    adSection.appendChild(img);

    if(image.fields.category == "banner"){
        img.style.width = 32 + '%';
    }
    if(image.fields.category == "reduce-size"){
        img.style.width = 6 + '%';
    }

    randomSelection();

    // randomizes the image locations
    randomImageLocation(img);

    document.querySelector("#refresh").addEventListener('click', () => {
        randomImageLocation(img);
        randomSelection();
    });
  });
}

// randomly select a section of the ads to display (between 3-20 ideally)
function randomSelection() {
    var imgAds = document.querySelectorAll(".ad-image");
    var random = Math.floor(Math.random() * imgAds.length);
    var randomAd = imgAds[random];
    noDisplay(randomAd);
}

function noDisplay(randomAd) {
    randomAd.classList.toggle("no-display");
}

// randomizes the image locations
function randomImageLocation(img) {
    img.style.left= (90 * Math.random()) + '%';
    img.style.bottom= (80 * Math.random()) + '%';
}