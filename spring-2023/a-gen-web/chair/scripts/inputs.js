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

// display settings for smaller windows
let settingsButton = document.querySelector("#settingsButton");
let devices = document.querySelector("#input-devices");
let sliderGrid = document.querySelector("#input-grid");
function showSettings() {
    if (devices.style.display === "block") {
        devices.style.display = "none";
        sliderGrid.style.display = "none";
        settingsButton.innerHTML = "VIEW SETTINGS";
    } else {
        devices.style.display = "block";
        sliderGrid.style.display = "grid";
        settingsButton.innerHTML = "HIDE SETTINGS";
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
        backBox.style.backgroundColor = "#D3D3D3";
    }
}
function lArmCheckBox() {
    if(window.getComputedStyle(lArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        lArmBox.style.backgroundColor = "#000000";
    } else {
        lArmBox.style.backgroundColor = "#D3D3D3";
    }
}
function rArmCheckBox() {
    if(window.getComputedStyle(rArmBox, null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        rArmBox.style.backgroundColor = "#000000";
    } else {
        rArmBox.style.backgroundColor = "#D3D3D3";
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
    let sliderValue = seatWidthSlider.value / 2.1;
    seatWidthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function seatLengthProgress() {
    let sliderValue = seatLengthSlider.value * 0.58;
    if(sliderValue < 10){
        sliderValue = seatLengthSlider.value * 0.45;
    }
    if(sliderValue > 60){
        sliderValue = seatLengthSlider.value * 0.66;
    }
    seatLengthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function seatHeightProgress() {
    let sliderValue = seatHeightSlider.value / 1.5;
    seatHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function armHeightProgress() {
    let sliderValue = armHeightSlider.value * 1.62;
    armHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function backHeightProgress() {
    let sliderValue = backHeightSlider.value * (100/145);
    if(sliderValue <= 20) {
        sliderValue = backHeightSlider.value * (100/145) - 5;
    }
    if(sliderValue >= 53) {
        sliderValue = backHeightSlider.value * (100/142) + 4;
    }
    backHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function backDepthProgress() {
    let sliderValue = backDepthSlider.value * (100/140);
    backDepthSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function backAngleProgress() {
    let sliderValue = 49;
    if(backAngleSlider.value < 0){
        sliderValue -= -backAngleSlider.value + 4;
    }
    if(backAngleSlider.value > 2){
        sliderValue -= -backAngleSlider.value - 2;
    }
    console.log(backAngleSlider.value);
    console.log(sliderValue);
    backAngleSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
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
    legNumberSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function legHeightProgress() {
    let sliderValue = legHeightSlider.value * 0.5 - 10;
    if(sliderValue > 0) {
        sliderValue = legHeightSlider.value * 0.5 - 5;
    }
    legHeightSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
}

function legThicknessProgress() {
    let sliderValue = legThicknessSlider.value * 12.5 - 10;
    if(sliderValue > 27){
        sliderValue = legThicknessSlider.value * 12.5 - 6;
    }
    if(sliderValue > 82){
        sliderValue = legThicknessSlider.value * 12.5 - 4;
    }
    legThicknessSlider.style.background = `linear-gradient(to right, #000000 ${sliderValue}%, #D3D3D3 ${sliderValue}%)`;
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