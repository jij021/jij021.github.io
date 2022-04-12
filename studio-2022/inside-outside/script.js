console.log("hello world");

// other functions -------------------------------------------



// airtable data -------------------------------------------

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyzO8HNBKPW555xb'
});
var base = Airtable.base('appJSCdd9N93mXE0I');

console.log(Airtable);

// get the "Warm-Images" table from the base, select ALL the items
base("Warm-Images").select({}).eachPage(gotPageOfImages, gotAllImages);

// an empty array to hold our Images data
const images = [];

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
  const adSection = document.querySelector("#ad-section");
  
  // loop through the books loaded from the Airtable API
  images.forEach((image) => {
    // make an img and add the "ad-image" class
    const img = document.createElement("img");
    img.classList.add("ad-image");
    img.src = image.fields.attachments[0].url;
    // put the img tags into the figure
    adSection.appendChild(img);
  });
}