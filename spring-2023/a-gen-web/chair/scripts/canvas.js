const canvasDiv = document.querySelector("#canvas");
const inputDiv = document.querySelector("#inputs");
const colorPickerDiv = document.querySelector("#colorPickerDiv");
const canvasWidth = canvasDiv.offsetWidth;
const canvasHeight = canvasDiv.offsetHeight;

let colorPicker, cameraPos;

let seatWidth = document.querySelector("#seatWidth");
let seatLength = document.querySelector("#seatLength");
let seatHeight = document.querySelector("#seatHeight");
let armHeight = document.querySelector("#armHeight");
let backHeight = document.querySelector("#backHeight");
let backAngle = document.querySelector("#backAngle");
let backDepth = document.querySelector("#backDepth");
let legNumber = document.querySelector("#legNumber");
let legHeight = document.querySelector("#legHeight");
let legThickness = document.querySelector("#legThickness");
let saveButton = document.querySelector("#saveButton");

// for sliders that may be removed
let arms = document.querySelectorAll(".arms");
let back = document.querySelectorAll(".back");

function setup() {
  var myCanvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  myCanvas.parent(canvasDiv);
  angleMode(DEGREES);

  colorPicker = createColorPicker('#000080');
  colorPicker.parent(colorPickerDiv);
  cameraPos = camera(80,-60,60,0,0,0);

  const firebaseConfig = {
    apiKey: "AIzaSyB6a-RqoaYVn6rZjL3EGtoK0YVP78IWBXc",
    authDomain: "uncomfortable-chair.firebaseapp.com",
    projectId: "uncomfortable-chair",
    storageBucket: "uncomfortable-chair.appspot.com",
    messagingSenderId: "878169192894",
    appId: "1:878169192894:web:58d0f77359ea0a87d521ef",
    measurementId: "G-RLTQYQSCRW"
  };
  firebase.initializeApp(firebaseConfig);
}

// when right click, reset the cam
canvasDiv.addEventListener("contextmenu", (e) => {cameraPos = camera(80,-60,60,0,0,0);});

function draw() {
  let dx = mouseX - width/2;
  let dy = mouseY - height/2;
      
  ambientLight('#ffffff');
  directionalLight(100,100,100,1,1,0)
  background('#f0f0f0');
  orbitControl(2,2.5,0.01);

  // global chair settings
  noStroke();
  ambientMaterial(colorPicker.value());

  // seat
  push();
    push();
      // add backAngle.value/4 to the 3rd value here to make the seat adjust according to back angle (only at certain height)
      translate(0, -legHeight.value/2 + 10, 0);
      push();
        translate(0, backHeight.value/2 - 15, 0);
        box(seatWidth.value, seatHeight.value, seatLength.value);
      pop();
    pop();
  pop();
  
  
  //__________________________________________________________
  
  // arms
  // right arm
  if(window.getComputedStyle(rArmBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    push();
      translate(0, -legHeight.value/2 + 10, 0);
      push();
        translate(0, backHeight.value/2 - 15, 0);
        push();
          translate(seatWidth.value/2+2, seatHeight.value/2-10, 0);
          box(5, armHeight.value, seatLength.value);
        pop();
      pop();
    pop();
  }
  // left arm
  if(window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    push();
      translate(0, -legHeight.value/2 + 10, 0);
      push();
        translate(0, backHeight.value/2 - 15, 0);
        push();
          translate(-seatWidth.value/2-2, seatHeight.value/2-10, 0);
          box(5, armHeight.value, seatLength.value);
        pop();
      pop();
    pop();
  }
  // if neither arms are selected, remove the appropriate slider
  if(((window.getComputedStyle(rArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)") && (window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"))){
    for(let i = 0; i < arms.length; i++){
      arms[i].style.display = "none";
    }
  } else {
    for(let i = 0; i < arms.length; i++){
      arms[i].style.display = "block";
    }
  }
  
  //__________________________________________________________
  
  // legs
  if(legNumber.value == 1) {
    oneLeg();
  }
  if(legNumber.value == 2) {
    twoLegs();
  }
  if(legNumber.value == 3) {
    push();
      translate(0, backHeight.value/2 - 15, 0);
      push();
        translate(0, seatHeight.value/2 + 10, seatLength.value * -0.38);
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(seatWidth.value/2 - 6, seatHeight.value/2 + 10, seatLength.value * 0.3)
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(-seatWidth.value/2 + 6, seatHeight.value/2 + 10, seatLength.value * 0.3)
        cylinder(legThickness.value, legHeight.value);
      pop();
    pop();
  }
  if(legNumber.value == 4){
    fourLegs();
  }
  if(legNumber.value == 5){
    oneLeg();
    fourLegs();
  }
  if(legNumber.value == 6){
    push();
      translate(0, backHeight.value/2 - 15, 0);
      push();
        translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
    pop();
    fourLegs();
  }
  if(legNumber.value == 7){
    oneLeg();
    push();
      translate(0, backHeight.value/2 - 15, 0);
      push();
        translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
    pop();
    fourLegs();
  }
  if(legNumber.value == 8){
    twoLegs();
    push();
      translate(0, backHeight.value/2 - 15, 0);
      push();
        translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
    pop();
    fourLegs();
  }
  if(legNumber.value == 9){
    oneLeg();
    twoLegs();
    push();
      translate(0, backHeight.value/2 - 15, 0);
      push();
        translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value);
      pop();
    pop();
    fourLegs();
  }

  //__________________________________________________________
  
  // back:
  if(window.getComputedStyle(backBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    push();
    translate(0, -legHeight.value/2 + 10, 0);
      push();
        translate(0, seatHeight.value/2 - 15, -seatLength.value/2);
        rotateX(backAngle.value);
        box(seatWidth.value, backHeight.value, backDepth.value);
      pop();
    pop();
  }
  // if back isn't selected, removed appropriate sliders
  if(window.getComputedStyle(backBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
    for(let i = 0; i < back.length; i++){
      back[i].style.display = "none";
    }
  } else {
    for(let i = 0; i < back.length; i++){
      back[i].style.display = "block";
    }
  }
  
  //__________________________________________________________
}

// leg functions
function oneLeg() {
  push();
    translate(0, backHeight.value/2 - 15, 0);
    push();
      translate(0,  seatHeight.value/2 + 10, 0);
      cylinder(legThickness.value, legHeight.value);
    pop();
  pop();
}

function twoLegs() {
  push();
    translate(0, backHeight.value/2 - 15, 0);
    push();
      translate(0,  seatHeight.value/2 + 10, seatLength.value * -0.45);
      cylinder(legThickness.value, legHeight.value);
    pop();
    push();
      translate(0, seatHeight.value/2 + 10, seatLength.value * 0.4);
      cylinder(legThickness.value, legHeight.value);
    pop();
  pop();
  
}

function fourLegs() {
  push();
    translate(0, backHeight.value/2 - 15, 0);
    push();
      translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, seatLength.value * -0.45)
      cylinder(legThickness.value, legHeight.value);
    pop();
    push();
      translate(-seatWidth.value/2 + 2,seatHeight.value/2 + 10, seatLength.value * -0.45)
      cylinder(legThickness.value, legHeight.value);
    pop();
    push();
      translate(seatWidth.value/2 - 2, seatHeight.value/2 + 10, seatLength.value * 0.4)
      cylinder(legThickness.value, legHeight.value);
    pop();
    push();
      translate(-seatWidth.value/2 + 2, seatHeight.value/2 + 10, seatLength.value * 0.4)
      cylinder(legThickness.value, legHeight.value);
    pop();
  pop();
}

function windowResized(){
  resizeCanvas(canvasWidth, canvasHeight);
}

function screenShot(){
  save('my-chair.png');
}

// saves the canvas to firebase
function saveCanvasToCloud() {
  // get the data URL of the saved image
  let canvasDataURL = canvas.toDataURL('image/png');

  // allows you to put in images into the firebase storage
  let storageRef = firebase.storage().ref();

  // give the file a unique name starting with the date
  let filename = Date.now() + '_my-chair.png';
  
  // uploads the file name and image to firebase
  let uploadTask = storageRef.child(filename).putString(canvasDataURL, 'data_url');

  // triggers an alert so the user knows its been saved to firebase and thus the collection
  savedToCloud();
}

let myAlert = document.querySelector("#savedAlert");

// sets an alert that notifies the user that its been sent to the collection
function savedToCloud() {
  console.log("Working")
  myAlert.style.display = "block";
  setTimeout(function(){ 
    myAlert.style.opacity = 0;
  }, 2000);
  setTimeout(function(){ 
    myAlert.style.display = "none"; 
    myAlert.style.opacity = 1;
  }, 3000);
}