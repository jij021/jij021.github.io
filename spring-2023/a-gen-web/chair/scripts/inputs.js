// info function
let info = document.querySelector("#explanation-container");
let infoLink = document.querySelector("#explanation-link");
let inputs = document.querySelector("#inputs");
function showDiv() {
    if (info.style.display === "flex") {
        info.style.display = "none";
        infoLink.style.display = "block";
        inputs.style.display = "flex";
    } else {
        info.style.display = "flex";
        infoLink.style.display = "none";
        inputs.style.display = "none";
    }
}

// checkbox functions
let backBox = document.querySelector("#backBox");
let lArmBox = document.querySelector("#lArmBox");
let rArmBox = document.querySelector("#rArmBox");
function backCheckBox() {
    if(window.getComputedStyle(backBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        backBox.style.backgroundColor = "#000000";
    } else {
        backBox.style.backgroundColor = "#ffffff";
    }
}
function lArmCheckBox() {
    if(window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        lArmBox.style.backgroundColor = "#000000";
    } else {
        lArmBox.style.backgroundColor = "#ffffff";
    }
}
function rArmCheckBox() {
    if(window.getComputedStyle(rArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        rArmBox.style.backgroundColor = "#000000";
    } else {
        rArmBox.style.backgroundColor = "#ffffff";
    }
}

// slider functions
let seatWidthSlider = document.querySelector("#seatWidth");
let seatLengthSlider = document.querySelector("#seatLength");
let seatHeightSlider = document.querySelector("#seatHeight");
let armHeightSlider = document.querySelector("#armHeight");
let backHeightSlider = document.querySelector("#backHeight");
let backAngleSlider = document.querySelector("#backAngle");
let backDepthSlider = document.querySelector("#backDepth");
let legNumberSlider = document.querySelector("#legNumber");
let legHeightSlider = document.querySelector("#legHeight");
let legThicknessSlider = document.querySelector("#legThickness");

// mult the slidervalue by (100 / max slider value) and then adjust w/ + - 10 or 5

function seatWidthProgress() {
    let sliderValue = seatWidthSlider.value / 2;
    seatWidthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function seatLengthProgress() {
    let sliderValue = seatLengthSlider.value * 0.64;
    if(sliderValue < 10){
        sliderValue = seatLengthSlider.value * 0.5;
    }
    seatLengthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function seatHeightProgress() {
    let sliderValue = seatHeightSlider.value / 1.5;
    seatHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function armHeightProgress() {
    let sliderValue = armHeightSlider.value * 1.66;
    armHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function backHeightProgress() {
    let sliderValue = backHeightSlider.value * (100/140);
    if(sliderValue <= 20) {
        sliderValue = backHeightSlider.value * (100/140) - 2;
    }
    if(sliderValue >= 70) {
        sliderValue = backHeightSlider.value * (100/140) + 4;
    }
    backHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function backDepthProgress() {
    let sliderValue = backDepthSlider.value * (100/140);
    backDepthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function backAngleProgress() {
    let sliderValue = 50;
    if(backAngleSlider.value < 0){
        sliderValue -= -backAngleSlider.value + 5;
    }
    if(backAngleSlider.value > 0){
        sliderValue -= -backAngleSlider.value;
    }
    backAngleSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function legNumberProgress() {
    let sliderValue = legNumberSlider.value * 10;
    if(sliderValue < 40){
        sliderValue = legNumberSlider.value * 10 - 5;
    }
    else if(sliderValue >= 70){
        sliderValue = legNumberSlider.value * 10 + 5;
    } else {
        sliderValue = legNumberSlider.value * 10;
    }
    legNumberSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function legHeightProgress() {
    let sliderValue = legHeightSlider.value * 0.5 - 10;
    if(sliderValue > 0) {
        sliderValue = legHeightSlider.value * 0.5 - 5;
    }
    legHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

function legThicknessProgress() {
    let sliderValue = legThicknessSlider.value * 12.5 - 10;
    if(sliderValue > 27){
        sliderValue = legThicknessSlider.value * 12.5 - 5;
    }
    legThicknessSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #ffffff ${sliderValue}%)`;
}

seatWidthProgress();
seatLengthProgress();
seatHeightProgress();
armHeightProgress();
backHeightProgress();
backDepthProgress();
backAngleProgress();
legNumberProgress();
legHeightProgress();
legThicknessProgress();