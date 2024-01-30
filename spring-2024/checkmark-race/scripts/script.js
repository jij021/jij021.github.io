// give the inputs each a unique id -------------------------------

let liArray = document.querySelectorAll("li");
let inputArray = document.querySelectorAll("input");

for(i = 0; i < liArray.length; i++){
    liArray[i].id = "li-" + i;
    inputArray[i].id = i;
}

// disable everything after the 1st one, and then keep going -------------------------------

let count = 0;
function enable() {
    count++;
    document.getElementById(count).disabled = false;
    document.getElementById("li-" + count).style.color = "black";
}

// click the start button, hide it, and start the timer -------------------------------

let minutes = 0;
let seconds = 0;
let mil = 0;

function format() {
  let str = "";
  if (minutes < 10) {
    str += "0" + minutes;
  } else {
    str += minutes;
  }
  str += ":";
  if (seconds < 10) {
    str += "0" + seconds;
  } else {
    str += seconds;
  }
  str += ":";
  if (mil < 100) {
    str += "0" + mil;
  } else {
    str += mil;
  }
  return str.substring(0, str.length - 1);
}

function check() {
  if (mil === 1000) {
    mil = 0;
    seconds += 1;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes === 60) {
    minutes = 0;
  }
}

let interval = null;

function start() {
    document.querySelector("#start-button").style.display = "none";
    document.querySelector("#checkboxes").style.display = "block";
    document.querySelector("#timer-container").style.color = "black";
    interval = setInterval(
        function timer() {
            mil += 10;
            check();
            document.querySelector('#timer').innerHTML = "Timer: " + format();
        }
    , 10);
}

function stop() {
    if(document.querySelectorAll('input[type="checkbox"]:checked').length === 45){
        clearInterval(interval);
        // confetti from confetti.js.org
        confetti({
            particleCount: 250,
            spread: 160,
            origin: { y: 0.9 },
        });
    }
}

// move the inputs left or right randomly if you checked the box right before it -------------------------------

let recentClick;
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

// scoreboard sorting
// convert the timer to a string
// add everyones score to an array
// sort the array with .sort
// create a list from the sorted array