function setup() {
    createCanvas(windowWidth/3, windowHeight/2);
}

function draw() {
    if(mouseIsPressed == false){
        colorMode(HSB);
        fill(mouseX, 50, 100);
        noStroke();
        ellipse(mouseX, mouseY, 70, 70);
    }
}

function windowResized() {
    resizeCanvas(windowWidth/3, windowHeight/2);
}

function keyPressed() {
    if(keyCode === SHIFT){
        background(0);
    }
}

function mouseDragged() {
    strokeWeight(5);
	stroke(255);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

function randomColor() {
    return random(255);
}

let button = document.querySelector("#button");
let main = document.querySelector("main");
let instructions = document.querySelector("#instructions");

button.addEventListener("click", () => {
    if(main.className == "lowerOpacity"){
        main.className = "normalOpacity";
        instructions.className = "hidden";
    }
    else {
        main.className = "lowerOpacity";
        instructions.className = "normalOpacity";
    }
        
});
