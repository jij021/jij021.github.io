console.log("Hello bookshelf!");

// animation effect

// selects the text that will be animated
const text = document.querySelector("#header-caption");
// splits the string into characters, each letter placed in a <span> tag inside the <p> tag
// '/\S/g' is an expression that catches all the whitespace in the string
    // the '/' at the start marks the beginning of the pattern we're looking for
    // the '\s' finds the whitespace in the string
    // '/g' stands for global, which means it matches all the whitespace, not just the first one
// '$&' is an expression that inserts a complete match 
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>")

// takes all the span elements that are being animated and adds a different animation property to them so that they form a "wave"
const element = document.querySelectorAll("span");
for(let i = 0; i < element.length; i++){
  element[i].style.animationDelay = i*0.03 + 's';
}

// fades the site in slowly
setTimeout( () => {
  document.querySelector("body").className = "fade-out-visible";
}, 1200);

// for background color effects
let adventureColor = 'hsl(50, 95%, 75%)';
let realisticColor = 'hsl(97, 70%, 75%)';
let graphicNovelColor = 'hsl(205, 88%, 80%)';

// airtable data -----------------------------------------------------------------------------------------------

var Airtable = require('airtable');
console.log(Airtable);

// creates the base that holds the specific airtable base data
var base = new Airtable({apiKey: 'keyzO8HNBKPW555xb'}).base('appS6LsHNLhe2xqxa');

// this ".select" method takes whatever data is in the "view" sidebar in airtable and transfers it to the site
base("books").select({
  view: "main"
}).eachPage(gotPageOfBooks, gotAllBooks);

// an empty array to hold our book data
var books = [];

// callback function that receives our data
function gotPageOfBooks(records, fetchNextPage) {
    console.log("gotPageOfBooks()");
    // add the records from this page to our books array
    books.push(...records);
    // request more pages
    fetchNextPage();
  }

// call back function that is called when all pages are loaded
function gotAllBooks(err) {
  console.log("gotAllBooks()");

  // reports an error
  if (err) {
    console.log("error loading books");
    console.error(err);
    return;
  }

  // call function to show the books
  showBooks();
}
  
// airtable book data -----------------------------------------------------------------------------------------------

console.log(books);

// create the book-spines on the shelf
function showBooks() {
  console.log("showBooks()");

  // find the shelf element
  const shelf = document.getElementById("shelf");

  // loop through the books loaded from the Airtable API
  books.forEach((book) => {
    // create the div, set its text and class
    const div = document.createElement("div");
    div.innerText = book.fields.title;
    div.classList.add("book-spine");
    // when the user clicks this book spine, call "showBook" and send the book data and this spine element
    div.addEventListener("click", () => {
      showBook(book, div);
      // change the background color to match the genre of the book selected
      if (book.fields.type == "Adventure") {
        document.querySelector("html").style.backgroundColor = adventureColor;
      } else if (book.fields.type == "Realistic") {
        document.querySelector("html").style.backgroundColor = realisticColor;
      } else if (book.fields.type == "Graphic novel") {
        document.querySelector("html").style.backgroundColor = graphicNovelColor;
      }
    });
    // put the newly created book spine on the shelf
    shelf.appendChild(div);
  });

  // reset the bookshelf and put the books away
  document.querySelector("#hide-books").addEventListener("click", () => {
    hideBook();
    document.querySelector("html").style.backgroundColor = "#fbfbfb";
  });
}

// show the detail info for a book, and highlight the active book-spine
function showBook(book, div) {
  console.log("showBook()", book);

  // find the book detail element
  const bookDetail = document.getElementById("book-detail");

  // populate the template with the data in the provided book
  bookDetail.getElementsByClassName("title")[0].innerText = book.fields.title; 
  bookDetail.getElementsByClassName("author")[0].innerText = "By " + book.fields.author; 
  bookDetail.getElementsByClassName("description")[0].innerText = book.fields.description;
  if (book.fields.more == "none") {
    bookDetail.getElementsByClassName("more-book-website")[0].style.display = "none";
  } else {
    bookDetail.getElementsByClassName("more-book-website")[0].style.display = "initial";
    bookDetail.getElementsByClassName("more-book-website")[0].href = book.fields.more;
  }
  bookDetail.getElementsByClassName("more-scholastic-store")[0].href = book.fields.scholastic;
  bookDetail.getElementsByClassName("cover-image")[0].src =
    book.fields.cover_image[0].url;

  // randomly rotate the cover image a little
  document.querySelector(".cover-image").style.transform = getRandomRotation();

  // remove the .active class from any book spines that have it
  const shelf = document.getElementById("shelf");
  const bookSpines = shelf.getElementsByClassName("active");
  for (const bookSpine of bookSpines) {
    bookSpine.classList.remove("active");
  }
  // ...and set it on the one just clicked
  div.classList.add("active");

  // reveal the detail element
  bookDetail.classList.remove("hidden");

  // change the color of the pills with the background
  if (book.fields.type == "Adventure") {
    document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 55%)";
    document.querySelector("#adventure-filter").style.backgroundColor = "hsl(50, 95%, 55%)";
    // changes the other pill colors to be normal
    document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
    document.querySelector("#realistic-filter").style.backgroundColor = "";
    document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
    document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
  } else if (book.fields.type == "Realistic") {
    document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 65%, 60%)";
    document.querySelector("#realistic-filter").style.backgroundColor = "hsl(97, 65%, 60%)";
    // changes the other pill colors to be normal
    document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
    document.querySelector("#adventure-filter").style.backgroundColor = "";
    document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
    document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
  } else if (book.fields.type == "Graphic novel") {
    document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 70%)";
    document.querySelector("#graphic-novel-filter").style.backgroundColor = "hsl(205, 90%, 70%)";
    // changes the other pill colors to be normal
    document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
    document.querySelector("#adventure-filter").style.backgroundColor = "";
    document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
    document.querySelector("#realistic-filter").style.backgroundColor = "";
  }
}

function hideBook(book, div) {
  // find the book detail element
  const bookDetail = document.getElementById("book-detail");

  // hide the book info
  bookDetail.classList.add("hidden");

  // remove the ".active" class from any book spines that have it
  const shelf = document.getElementById("shelf");
  const bookSpines = shelf.getElementsByClassName("active");
  for (const bookSpine of bookSpines) {
    bookSpine.classList.remove("active");
  }

  // changes all the pills to the default
  document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
  document.querySelector("#adventure-filter").style.backgroundColor = "";
  document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
  document.querySelector("#realistic-filter").style.backgroundColor = "";
  document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
  document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
}

// misc functions for added interactivity

function backgroundWhite() {
  // changes the background color back to white
  document.querySelector("html").style.backgroundColor = "rgb(255, 255, 255)";
}

function getRandomRotation() {
  let min = -5;
  let max = 5;
  return 'rotate(' + (Math.random() * (max - min) + min) + 'deg)';
}

// used for clicking book cover image interaction - rotate books slightly everytime you click on the book cover
function rotateImage() {
  document.querySelector(".cover-image").style.transform = getRandomRotation();
}

// magnetic pull on "put away books" button and pill navs
const magnetic = document.querySelectorAll(".magnetic");

magnetic.forEach((div) => {
  div.addEventListener("mousemove", function(e){
    const pos = div.getBoundingClientRect();
    const x = e.pageX - pos.left - pos.width / 2;
    const y = e.pageY - pos.top - pos.height / 2;

    div.style.transform = "translate(" + x * 0.3 + "px, " + y * 0.5 + "px)";
  });
});

// resets the position for the magnetic element once the mouse isnt on the element
magnetic.forEach((div) => {
  div.addEventListener("mouseout", function(e){
    div.style.transform = "translate(0px, 0px)";
  });
});

// pill filters to filter out data -----------------------------------------------------------------------------------------------

// all filter
document.querySelector("#all-filter").addEventListener("click", () => {
  // loop through the books loaded from the Airtable API
  const bookSpines = document.querySelectorAll(".book-spine");
  // hide the book detail data in case it clashes
  hideBook();
  // removes each book currently on the shelf
  bookSpines.forEach(book => {
    book.remove();
  });
  // clear the array to make way for new info
  books = [];
  base("books").select({
    view: "main"
  }).eachPage(gotPageOfBooks, gotAllBooks);
  backgroundWhite();

  // changes all the other pills to the default style
  document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
  document.querySelector("#adventure-filter").style.backgroundColor = "";
  document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
  document.querySelector("#realistic-filter").style.backgroundColor = "";
  document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
  document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
});

// adventure filter
document.querySelector("#adventure-filter").addEventListener("click", () => {
  const bookSpines = document.querySelectorAll(".book-spine");
  hideBook();
  bookSpines.forEach(book => {
    book.remove();
  });
  books = [];
  base("books").select({
    view: "adventure"
  }).eachPage(gotPageOfBooks, gotAllBooks);
  document.querySelector("html").style.backgroundColor = adventureColor;

  // makes the active pill nav darker
  if (document.querySelector("html").style.backgroundColor = adventureColor) {
    document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 55%)";
    document.querySelector("#adventure-filter").style.backgroundColor = "hsl(50, 95%, 55%)";
  }

  // check for other pill status
  document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
  document.querySelector("#realistic-filter").style.backgroundColor = "";
  document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
  document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
});

// realistic filter
document.querySelector("#realistic-filter").addEventListener("click", () => {
  const bookSpines = document.querySelectorAll(".book-spine");
  hideBook();
  bookSpines.forEach(book => {
    book.remove();
  });
  books = [];
  base("books").select({
    view: "realistic"
  }).eachPage(gotPageOfBooks, gotAllBooks);
  document.querySelector("html").style.backgroundColor = realisticColor;

  // makes the active pill nav darker
  if (document.querySelector("html").style.backgroundColor = realisticColor) {
    document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 65%, 60%)";
    document.querySelector("#realistic-filter").style.backgroundColor = "hsl(97, 65%, 60%)";
  }

  // check for other pill status
  document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
  document.querySelector("#adventure-filter").style.backgroundColor = "";
  document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 80%)";
  document.querySelector("#graphic-novel-filter").style.backgroundColor = "";
});

// graphic novel filter
document.querySelector("#graphic-novel-filter").addEventListener("click", () => {
  const bookSpines = document.querySelectorAll(".book-spine");
  hideBook();
  bookSpines.forEach(book => {
    book.remove();
  });
  books = [];
  base("books").select({
    view: "graphic_novel"
  }).eachPage(gotPageOfBooks, gotAllBooks);
  document.querySelector("html").style.backgroundColor = graphicNovelColor;

  // makes the active pill nav darker
  if (document.querySelector("html").style.backgroundColor = graphicNovelColor) {
    document.querySelector("#graphic-novel-filter").style.borderColor = "hsl(205, 90%, 70%)";
    document.querySelector("#graphic-novel-filter").style.backgroundColor = "hsl(205, 90%, 70%)";
  }

  // check for other pill status
  document.querySelector("#adventure-filter").style.borderColor = "hsl(50, 95%, 77%)";
  document.querySelector("#adventure-filter").style.backgroundColor = "";
  document.querySelector("#realistic-filter").style.borderColor = "hsl(97, 75%, 73%)";
  document.querySelector("#realistic-filter").style.backgroundColor = "";
});