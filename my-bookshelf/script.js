console.log("Hello bookshelf!");

// animation effect

const text = document.querySelector("#header-caption");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>")

const element = document.querySelectorAll("span");
for(let i = 0; i < element.length; i++){
  element[i].style.animationDelay = i*0.03 + 's';
}

setTimeout( () => {
  document.querySelector("body").className = "fade-out-visible";
}, 1200);

// for background color effects
let adventureColor = 'hsl(56, 95%, 80%, 1)';
let realisticColor = 'hsl(101, 95%, 80%, 1)';
let graphicNovelColor = 'hsl(192, 95%, 80%, 1)';

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
  bookDetail.getElementsByClassName("description")[0].innerText =
    book.fields.description;
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

  // reveal the detail element, we only really need this the first time
  // but its not hurting to do it more than once
  bookDetail.classList.remove("hidden");
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
}

// misc functions for added interactivity

function getRandomColor() {
  return 'hsla(' + (Math.random() * 360) + ', 95%, 75%, 1)';
}

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
});