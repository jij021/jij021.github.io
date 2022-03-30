console.log("hello world");

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyzO8HNBKPW555xb'
});
var base = new Airtable({apiKey: 'keyzO8HNBKPW555xb'}).base('appJSCdd9N93mXE0I');

console.log(Airtable);

// get the "Images" table from the base, select ALL the items
base("Images").select({}).eachPage(gotPageOfImages, gotAllImages);

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

function showImages() {
    console.log("showImages()");
    images.forEach((image) => {
        const h2 = document.createElement("h2");
        h2.innerText = image.fields.Title;
        document.body.appendChild(h2);
    })
}