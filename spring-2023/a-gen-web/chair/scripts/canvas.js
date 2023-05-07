const canvasDiv = document.querySelector("#canvas");
const inputDiv = document.querySelector("#inputs");
const colorPickerDiv = document.querySelector("#colorPickerDiv");
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

let colorPicker, cameraPos, savedImg, myCanvas, thinker;

let seatWidth = document.querySelector("#seatWidth");
let seatLength = document.querySelector("#seatLength");
let seatHeight = document.querySelector("#seatHeight");
let armHeight = document.querySelector("#armHeight");
let armZPosition = document.querySelector("#armZPosition");
let armAngle = document.querySelector("#armAngle");
let backHeight = document.querySelector("#backHeight");
let backDepth = document.querySelector("#backDepth");
let legNumber = document.querySelector("#legNumber");
let legHeight = document.querySelector("#legHeight");
let legThickness = document.querySelector("#legThickness");
let saveButton = document.querySelector("#saveButton");

// for sliders that may be removed
let arms = document.querySelectorAll(".arms");
let back = document.querySelectorAll(".back");

function preload() {
  thinker = loadModel('/images/thinker.obj');
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  myCanvas.parent(canvasDiv);
  angleMode(DEGREES);

  colorPicker = createColorPicker('#000080');
  colorPicker.parent(colorPickerDiv);
  cameraPos = camera(100,-40,80,0,0,0);

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

function draw() {
  let dx = mouseX - width/2;
  let dy = mouseY - height/2;
  
  background('#f0f0f0');
  orbitControl(2,2.5,0.01);

   // optional thinker statue
   if(window.getComputedStyle(thinkerBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    // thinker statue colors
    push();
      if(window.getComputedStyle(wireframeBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
        noFill();
        stroke("#818589");
        strokeWeight(0.12);
      } else {
        noStroke();
        ambientLight('#ffffff');
        directionalLight(100,100,100,1,1,0)
        ambientMaterial("#818589");
      }
      scale(0.27);
      rotateY(90);
      rotateZ(180);
      translate(-15, -57, -13);
      push();

        // if the back depth is too long, put the thinker statue on top of the chair's back
        // else put it normally on the seat
        
        if(seatLength.value - backDepth.value < -12){

          // if the backheight is smaller than the seat height regardless, put the statue back on the seat
          // else, keep the statue on the chair's back

          if((backHeight.value - seatHeight.value) < 0){
            if(seatLength.value >= 15) {
              translate(seatLength.value * 1.85, (seatHeight.value * 1.85 - 5) - (backHeight.value * 1.85), 0);
            } else {
              translate(30, (seatHeight.value * 1.9 - 10) - (backHeight.value * 1.85), 0);
            }
            push();
              if(legHeight.value <= 90) {
                translate(0, legHeight.value * 1.9, 0);
              } else {
                translate(0, legHeight.value * 1.85, 0);
              }
              model(thinker);
            pop();
          }
          else {
            if(backHeight.value >= 15){
              translate(backDepth.value * 1.85 - 55, (backHeight.value * 1.85 - 5) - (seatHeight.value * 1.85), 0);
            } else {
              translate(backDepth.value * 1.85 - 55, (backHeight.value * 1.9 - 5) - (seatHeight.value * 1.85), 0);
            }
            push();
              if(legHeight.value <= 90) {
                translate(0, legHeight.value * 1.9, 0);
              } else {
                translate(0, legHeight.value * 1.85, 0);
              } 

              model(thinker);
              
            pop();
          }
        } 

        else {
          if(seatLength.value >= 15) {
            translate(seatLength.value * 1.85, (seatHeight.value * 1.85 - 5) - (backHeight.value * 1.85), 0);
          } else {
            translate(30, (seatHeight.value * 1.9 - 5) - (backHeight.value * 1.85), 0);
          }
          push();
            if(legHeight.value <= 90) {
              translate(0, legHeight.value * 1.9, 0);
            } else {
              translate(0, legHeight.value * 1.85, 0);
            }
            model(thinker);
          pop();
        }
      pop();
    pop();
  }

  // wireframe mode for better performance
  if(window.getComputedStyle(wireframeBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    noFill();
    stroke(colorPicker.value());
    strokeWeight(0.12);
  } else {
    noStroke();
    ambientLight('#ffffff');
    directionalLight(100,100,100,1,1,0);
    ambientMaterial(colorPicker.value());
  }

  // seat
  push();
    push();
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
      translate(0, armZPosition.value, 0);
      push();
        translate(0, -legHeight.value/2 + 10, 0);
        push();
          translate(0, backHeight.value/2 - 15, 0);
          push();
            translate(seatWidth.value/2+2, seatHeight.value/2-10, 0);
            rotateX(armAngle.value);
            box(5, armHeight.value, seatLength.value);
          pop();
        pop();
      pop();
    pop();
    
  }
  // left arm
  if(window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(0, 0, 0)"){
    push();
      translate(0, armZPosition.value, 0);
      push();
        translate(0, -legHeight.value/2 + 10, 0);
        push();
          translate(0, backHeight.value/2 - 15, 0);
          push();
            translate(-seatWidth.value/2-2, seatHeight.value/2-10, 0);
            rotateX(armAngle.value);
            box(5, armHeight.value, seatLength.value);
          pop();
        pop();
      pop();
    pop();
  }
  // if neither arms are selected, remove the appropriate slider and hr tabs
  if(((window.getComputedStyle(rArmBox, null).getPropertyValue('background-color') == "rgb(240, 240, 240)") && (window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(240, 240, 240)"))){
    for(let i = 0; i < arms.length; i++){
      arms[i].style.display = "none";
    }
    document.querySelector("#armHR_1").style.display = "none";
    document.querySelector("#armHR_2").style.display = "none";
  } else {
    for(let i = 0; i < arms.length; i++){
      arms[i].style.display = "block";
    }
    document.querySelector("#armHR_1").style.display = "block";
    document.querySelector("#armHR_2").style.display = "block";
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
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(seatWidth.value/2 - 6, seatHeight.value/2 + 10, seatLength.value * 0.3)
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(-seatWidth.value/2 + 6, seatHeight.value/2 + 10, seatLength.value * 0.3)
        cylinder(legThickness.value, legHeight.value, 10);
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
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value, 10);
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
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value, 10);
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
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value, 10);
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
        cylinder(legThickness.value, legHeight.value, 10);
      pop();
      push();
        translate(-seatWidth.value/2 + 2,  seatHeight.value/2 + 10, 0);
        cylinder(legThickness.value, legHeight.value, 10);
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
        box(seatWidth.value, backHeight.value, backDepth.value);
      pop();
    pop();
  }
  // if back isn't selected, remove appropriate sliders and hr tabs
  if(window.getComputedStyle(backBox, null).getPropertyValue('background-color') == "rgb(240, 240, 240)"){
    for(let i = 0; i < back.length; i++){
      back[i].style.display = "none";
    }
    document.querySelector("#backHR_1").style.display = "none";
    document.querySelector("#backHR_2").style.display = "none";
  } else {
    for(let i = 0; i < back.length; i++){
      back[i].style.display = "block";
      document.querySelector("#backHR_1").style.display = "block";
      document.querySelector("#backHR_2").style.display = "block";
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
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
  pop();
}

function twoLegs() {
  push();
    translate(0, backHeight.value/2 - 15, 0);
    push();
      translate(0,  seatHeight.value/2 + 10, seatLength.value * -0.45);
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
    push();
      translate(0, seatHeight.value/2 + 10, seatLength.value * 0.4);
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
  pop();
  
}

function fourLegs() {
  push();
    translate(0, backHeight.value/2 - 15, 0);
    push();
      translate(seatWidth.value/2 - 2,  seatHeight.value/2 + 10, seatLength.value * -0.45)
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
    push();
      translate(-seatWidth.value/2 + 2,seatHeight.value/2 + 10, seatLength.value * -0.45)
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
    push();
      translate(seatWidth.value/2 - 2, seatHeight.value/2 + 10, seatLength.value * 0.4)
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
    push();
      translate(-seatWidth.value/2 + 2, seatHeight.value/2 + 10, seatLength.value * 0.4)
      cylinder(legThickness.value, legHeight.value, 10);
    pop();
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyTyped(){
  if(key == 'r' || key == 'R'){
    cameraPos = camera(100,-40,80,0,0,0);
  }
}

function screenShot(){
  // savedImg = myCanvas.get(windowWidth/4, 0, windowWidth/2 + windowWidth/8, windowHeight);
  // savedImg.save('my-chair', 'png');
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