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

// start the timer after start is clicked -------------------------------

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

let started = false;

function start() {
  started = true;
  document.querySelector("#fadeout-top").style.display = "block";
  document.querySelector("#fadeout-bottom").style.display = "block";
  document.querySelector("#start-button").style.display = "none";
  document.querySelector("#checkboxes").style.display = "block";
  document.querySelector("#timer-container").style.color = "black";
  interval = setInterval(
  function timer() {
      mil += 10;
      check();
      document.querySelector('#timer').innerHTML = "Timer: " + format();
  }, 10);
}

// stop the timer and show the submit area 

function stop() {
  // if all the checkboxes have been checked
    if(document.querySelectorAll('input[type="checkbox"]:checked').length === 45){
        clearInterval(interval);
        // confetti from confetti.js.org
        const colors = ["#0028FF", "#FF2800"];
        (function frame() {
          confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 },
            colors: colors,
          });
          confetti({
            particleCount: 150,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 },
            colors: colors,
          });
        })();
        document.querySelector("#score-container").style.display = "block";
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
        translateY = translateY - 27;
        
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

// mobile sizes hiding 
window.addEventListener("resize", function() {
  if(window.innerWidth >= 768) {
    document.querySelector("#left").style.display = "block";
    document.querySelector("#right").style.display = "flex";
  }
  if(window.innerWidth < 768 && started === true) {
    document.querySelector("#left").style.display = "none";
    document.querySelector("#right").style.display = "flex";
    document.querySelector("#right").style.overflow = "hidden";
  }
});

function startMobile() {
  document.querySelector("#left").style.display = "none";
  document.querySelector("#right").style.display = "flex";

  start();
}