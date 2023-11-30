// things to do (eventually):
// 1) change the cursor to a pointer when hovering over the home (very hard for some reason!!!!)

// change bg color
const colorSlider = document.getElementById('bgColor');

colorSlider.addEventListener('input', function() {
  const hueValue = this.value; 
  document.body.style.backgroundColor = hueValue; 
});

// firebase initialization --------------------------------------------------------------------------------------------

// for rolling the text prompts
let myRoll;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max); // exclusive
    return Math.floor(Math.random() * (max - min) + min); 
}
function roll() {
    return getRandomInt(0, 4);
}

// the parent container to put the images in
let homeGrid = document.querySelector("#homegrid");
const rows = 20; // Number of rows in the grid
const cols = 20; // Number of columns in the grid

// makes a cell for every row and column
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.setAttribute('id', `cell-${i}-${j}`);

    homeGrid.appendChild(cell);
  }
}

console.log("firebase working");

const firebaseConfig = {
    apiKey: "AIzaSyDJMtGBO8PKtVCFZrWZKddiwfICzl473rY",
    authDomain: "homebase-95f8d.firebaseapp.com",
    projectId: "homebase-95f8d",
    storageBucket: "homebase-95f8d.appspot.com",
    messagingSenderId: "859067260491",
    appId: "1:859067260491:web:3c8a79540e7d70e71f77ce"
  };
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// refs the firebase storage
var storage = firebase.storage();

// refs the image folder in storage
var imagesRef = storage.ref().child('images');
var storageRef = firebase.storage().ref();

let images = [];
let id;

// FUNCTIONS TO RETRIEVE IMAGES/TEXT DATA AND SHOW THEM ON THE GRID -------------------------------------------------------------------------------------------------

// puts objects randomly within grid (IF CHANGING GRID, CHANGE THE NUMBERS!!!!!!!!!!!!)
function positionObjectsInGrid() {
  // generates random grid positions
  function getRandomGridPosition() {
    const row = Math.floor(Math.random() * 20) + 1; // Random row number (1-20)
    const col = Math.floor(Math.random() * 20) + 1; // Random column number (1-20)
    return { row, col };
  }

  // checks if a grid cell is occupied
  function isCellOccupied(row, col) {
    const cell = document.querySelector(`#homegrid > div:nth-child(${row}) > div:nth-child(${col})`);
    return cell && cell.children.length > 0;
  }

  // save the position in firebase RT DB
  function storeGridPosition(svgID, row, col) {
    const firebaseRef = firebase.database().ref('elementPositions/' + svgID);
    firebaseRef.once('value')
      .then((snapshot) => {
        const positionData = snapshot.val();
        if (!positionData) {
          // if position data doesn't exist for the SVG ID, set the position
          firebaseRef.set({ row: row, col: col })
            .then(() => {
              console.log(`Position set for SVG ID ${svgID}: row ${row}, col ${col}`);
            })
            .catch((error) => {
              console.error('Error setting element position:', error);
            });
        } else {
          // if position data already exists, don't override it
          console.log(`Position already exists for SVG ID ${svgID}: row ${positionData.row}, col ${positionData.col}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching element position:', error);
      });
  }

  let posExists = false;
  // get the position from firebase RT DB
  function fetchGridPosition(svgID, svgUrl, userInput) {
    const firebaseRef = firebase.database().ref('elementPositions/' + svgID);
    firebaseRef.once('value')
      .then((snapshot) => {
        const positionData = snapshot.val();
        if (positionData) {
          posExists = true;
          const row = positionData.row;
          const col = positionData.col;
          // log for row and col values for the given SVG ID
          console.log(`Position for SVG ID ${svgID}: row ${row}, col ${col}`);
          
          const cellId = `cell-${row}-${col}`;
          const cell = document.getElementById(cellId);
          if (cell) {
            // Create a div element for the object
            const object = document.createElement('object');
            object.type = 'image/svg+xml';
            object.data = svgUrl;

            const textInputSpan = document.createElement('span');

            // adds the tooltip class for the text
            textInputSpan.classList.add("tooltip-text");

            // get a random text input prompt
            myRoll = roll();
            if(myRoll == 0){
                textInputSpan.innerHTML = "Home is born from <b>" + userInput + "</b>"; // Set text input as the content of the span
            }
            if(myRoll == 1){
                textInputSpan.innerHTML = "Home isn't complete without <b>" + userInput + "</b>"; 
            }
            if(myRoll == 2){
                textInputSpan.innerHTML = "Home is full of <b>" + userInput + "</b>"; 
            }
            if(myRoll == 3){
                textInputSpan.innerHTML = "Home is made from lots of <b>" + userInput + "</b>"; 
            }

            let myDiv = document.createElement("div");
            myDiv.classList.add("tooltip");
            myDiv.appendChild(textInputSpan);
            myDiv.appendChild(object);

            cell.appendChild(myDiv);  
          }

        } else {
          console.log(`No position data found for SVG ID ${svgID}`);
          displaySVGAndTextInput(svgID, svgUrl, userInput);
        }
      })
      .catch((error) => {
        console.error('Error fetching element position:', error);
      });
  }

  // retrieve SVG URLs from firebase storage
  function fetchSVGUrlsFromStorage() {
    // list all svgs in firebase storage
    storageRef.listAll().then((result) => {
      result.items.forEach((item) => {
        const svgID = item.name.split('_')[0]; // extract SVG ID from the filename
        item.getDownloadURL().then((url) => {
          fetchDataFromDatabase(svgID, url); // fetch data from realtime database based on SVG ID
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      });
    }).catch((error) => {
      console.error('Error retrieving SVG files from Firebase Storage:', error);
    });
  }

  // fetch data from Realtime Database based on SVG ID (based on Date.now() and stored in both file name and as a key)
  function fetchDataFromDatabase(svgID, svgUrl) {
    const databaseRef = firebase.database().ref('svgUserData/' + svgID);
    databaseRef.once('value').then((snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.userInput) {
        displaySVGAndTextInput(svgID, svgUrl, userData.userInput); // display SVG and text input
      } else {
        console.log('No user input available for SVG ID ' + svgID);
      }
    }).catch((error) => {
      console.error('Error fetching data for SVG ID ' + svgID + ':', error);
    });
  }

  // displays SVG and associated text input in a container
  function displaySVGAndTextInput(svgID, svgUrl, userInput) {
    // put the svgs that already have cells assigned to them into their cells
    fetchGridPosition(svgID, svgUrl, userInput);

    // if the svg doesn't have an associated position with their svgID, then position them somewhere random and store their new position
    if(posExists == true){
      // Generate a random position until an unoccupied cell is found
      let position = getRandomGridPosition();

      while (isCellOccupied(position.row, position.col)) {
        position = getRandomGridPosition();
      }

      const cellRow = position.row;
      const cellCol = position.col;
      const cellId = `cell-${cellRow}-${cellCol}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        // Create a div element for the object
        const object = document.createElement('object');
        object.type = 'image/svg+xml';
        object.data = svgUrl;

        const textInputSpan = document.createElement('span');

        // adds the tooltip class for the text
        textInputSpan.classList.add("tooltip-text");

        // get a random text input prompt
        myRoll = roll();
        if(myRoll == 0){
            textInputSpan.innerHTML = "Home is born from <b>" + userInput + "</b>"; // Set text input as the content of the span
        }
        if(myRoll == 1){
            textInputSpan.innerHTML = "Home isn't complete without <b>" + userInput + "</b>"; 
        }
        if(myRoll == 2){
            textInputSpan.innerHTML = "Home is full of <b>" + userInput + "</b>"; 
        }
        if(myRoll == 3){
            textInputSpan.innerHTML = "Home is made from lots of <b>" + userInput + "</b>"; 
        }

        let myDiv = document.createElement("div");
        myDiv.classList.add("tooltip");
        myDiv.appendChild(textInputSpan);
        myDiv.appendChild(object);

        cell.appendChild(myDiv);      

        // save the cell that this myDiv was placed in (will not override svgs that already have a position)
        storeGridPosition(svgID, cellRow, cellCol);
      } else {
        console.error('Grid cell not found for position:', position);
      }
    }
  }
  // Call the function to fetch SVG URLs and associated data
  fetchSVGUrlsFromStorage();
}

// Call the function to position objects in the grid
positionObjectsInGrid();

// zoomable grid ---------------------------------------------------------------------------------------------------------------

const zoomableDiv = document.getElementById('zoomable-homegrid');
let scale = 0.3; // initial scale on loading
const scaleFactor = 0.1; // scaling increments for zooming

// zoom handling function
function handleZoom(event) {
  const delta = event.deltaY;
  
  // increase/decrease scale based on scroll direction
  if (delta > 0) {
    scale -= scaleFactor;
  } else {
    scale += scaleFactor;
  }

  // scale limiting range (minimum, max)
  scale = Math.min(Math.max(scale, 0.2), 1);

  // apply the scale transformation to the grid
  zoomableDiv.style.transform = `scale(${scale})`;
}

// add scroll event listener to the whole window for zooming
window.addEventListener('wheel', handleZoom);

// dragging to pan the camera around
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

// keep scrolling if you're holding down the mouse
function handleMouseDown(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  scrollLeft = window.scrollX;
  scrollTop = window.scrollY;
}

function handleMouseMove(event) {
  if (!isDragging) return;
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  window.scrollTo(scrollLeft - deltaX, scrollTop - deltaY);
}

// stop scrolling if you let go of the mouse key
function handleMouseUp() {
  isDragging = false;
}

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('mouseleave', handleMouseUp);