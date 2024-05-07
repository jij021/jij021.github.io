// moving to the next question
let q1 = document.querySelector("#q-1");
let q2 = document.querySelector("#q-2");
let q3 = document.querySelector("#q-3");
let q4 = document.querySelector("#q-4");
let result = document.querySelector("#result");

let q1_check = document.querySelector("#imageUpload");
let q2_check = document.querySelector("#treasureName");
let q3_check = document.querySelector("#ownerName");
let q4_check = document.querySelectorAll(".radio");

setInterval(() => {
    if(q1_check.checkValidity()){
        document.querySelector("#image-caption").innerHTML = "Image successfully uploaded.";
        document.querySelector("#image-caption").style.mixBlendMode = "multiply";

        document.querySelector("#addImage").style.backgroundColor = "#eaf8ed";
        document.querySelector("#addImage").style.border = "2px dashed #c9dfcf";
        document.querySelector("#addImage").style.mixBlendMode = "multiply";
    };
}, 500);

function nextOne() {
    if(q1_check.checkValidity()) {
        $("#q-1").fadeOut(600);
        q1.classList.add("hidden-section");
        setTimeout(() => {
            $("#q-2").fadeIn(600);
            q2.classList.remove("hidden-section");
        }, 600);
    } else {
        document.querySelector("#warning-1").classList.remove("hidden-section");
    }
}

function nextTwo() {
    $("#q-2").fadeOut(500);
    q2.classList.add("hidden-section");
    setTimeout(() => {
        $("#q-3").fadeIn(500);
        q3.classList.remove("hidden-section");
    }, 600);
    
}

function nextThree() {
    $("#q-3").fadeOut(500);
    q3.classList.add("hidden-section");
    setTimeout(() => {
        $("#q-4").fadeIn(500);
        q4.classList.remove("hidden-section");
    }, 600);
}

function nextFour() {
    $("#q-4").fadeOut(500);
    q4.classList.add("hidden-section");
    setTimeout(() => {
        $("#result").fadeIn(500);
        result.classList.remove("hidden-section");
    }, 600);
    
}