console.log("hello world");

// other functions -------------------------------------------

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu-item");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector("#close-icon");
const menuIcon = document.querySelector("#menu-icon");

function toggleMenu() {
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("show-menu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
    function(menuItem) { 
      menuItem.addEventListener("click", toggleMenu);
    }
)

// airtable data -------------------------------------------

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

// function showBook(img, div) {
//     console.log("showBook()", img);
  
//     // find the img detail element
//     const bookDetail = document.getElementById("book-detail");
  
//     // populate the template with the data in the provided book
//     bookDetail.getElementsByClassName("title")[0].innerText = img.fields.title; 
//     bookDetail.getElementsByClassName("author")[0].innerText = "By " + img.fields.author; 
//     bookDetail.getElementsByClassName("description")[0].innerText =
//     img.fields.description;
//     bookDetail.getElementsByClassName("more")[0].href = img.fields.more;
//     bookDetail.getElementsByClassName("cover-image")[0].src =
//     img.fields.cover_image[0].url;
  
//     // randomly rotate the cover image a little
//     document.querySelector(".cover-image").style.transform = getRandomRotation();
  
//     // remove the .active class from any book spines that have it...
//     const shelf = document.getElementById("shelf");
//     const bookSpines = shelf.getElementsByClassName("active");
//     for (const bookSpine of bookSpines) {
//       bookSpine.classList.remove("active");
//     }
//     // ...and set it on the one just clicked
//     div.classList.add("active");
  
//     // reveal the detail element, we only really need this the first time
//     // but its not hurting to do it more than once
//     bookDetail.classList.remove("hidden");
//   }