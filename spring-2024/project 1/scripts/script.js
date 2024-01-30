// give the inputs each a unique id

let liArray = document.querySelectorAll("li");
let inputArray = document.querySelectorAll("input");
let count = 0;
for(i = 0; i < liArray.length; i++){
    liArray[i].id = "li-" + i;
    inputArray[i].id = i;
}

// click the start button, hide it, and start the timer <<<<<<<<<<<<<<<<<<<<<<<<<<
function start() {
    document.querySelector("#start-button").style.display = "none";
    document.querySelector("#checkboxes").style.display = "block";
    document.querySelector("#timer-container").style.color = "black";
}

// move the inputs left or right randomly if you checked the box right before it

// function that returns the id of a checked checkbox (via onclick)
// store the most recently clicked checkbox in this variable
let recentClick;
// the id of the checkbox after the most recent one
let nextNum; 
function returnId(idNum) {
    recentClick = idNum;
    nextNum = parseInt(idNum) + 1;
}

// get a random int
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

// choose left (0) or right (1)
function chooseLeftOrRight() {
    return Math.floor(Math.random() * 2);
}

// move the checkboxes
// track how much to move the id down
let translateY = 0;
function moveInput() {
    // check if this id is checked
    if(document.getElementById(recentClick).checked) {
        // move the next id 
        translateY = translateY - 22;
        
        let coinflip = chooseLeftOrRight();
        if(coinflip == 0){
            document.getElementById("li-" + nextNum).style.marginLeft = getRandomInt(0,3) + "em";
            document.getElementById("checkboxes").style.transform = "translateY(" + translateY + "px)";
        }
        else if(coinflip == 1){
            document.getElementById("li-" + nextNum).style.marginLeft = "-" + getRandomInt(0,3) + "em";
            document.getElementById("checkboxes").style.transform = "translateY(" + translateY + "px)";
        }
        
    } else {
        // dont do anything
    }
}