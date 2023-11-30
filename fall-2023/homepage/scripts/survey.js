// for the actual survey section with the questions + building the answers in the bg

function startSurvey() {
    document.querySelector('#preSurvey').style.display = 'none';
    document.querySelector('#question1').style.display = 'block';
}

// records what question we're on
let currentQuestion = 1;
const warnings = document.querySelectorAll(".warning");

// survey variables for making SVGs
let behavioralSum = 0;
let physicalSum = 0;
let socialSum = 0;
let CESum = 0;
let baseColor = '#000000';
let roofColor = '#000000';
let shortResponse = '';

// checking for radio box questions -------------------------------------------------------------------------------
function nextQuestion() {    
    let current = document.querySelector('#question' + currentQuestion);
    let next = document.querySelector('#question' + (currentQuestion + 1));
    if (current && next) {
        // checking if the user has selected a radiobox
        const radios = current.querySelectorAll('input[type="radio"]:checked');
        // checking which section with radio inputs we're on
        let radioQ = document.getElementsByName("Q" + currentQuestion);

        // if they have, move to the next question
        if (radios.length > 0) {
            // save what your response was for this question and store in the correct variable
            // if current question is 1-2, then use the behavioralSum variable
            if(currentQuestion == 1 || currentQuestion == 2){
                radioQ.forEach(radio => {
                    if(radio.checked){ behavioralSum += Number(radio.value); }
                });
            }

            // if current question is 3-4, then use the physicalSum variable
            if(currentQuestion == 3 || currentQuestion == 4){
                radioQ.forEach(radio => {
                    if(radio.checked){ physicalSum += Number(radio.value); }
                });
            }

            // if current question is 5-6, then use the socialSum variable
            if(currentQuestion == 5 || currentQuestion == 6){
                radioQ.forEach(radio => {
                    if(radio.checked){ socialSum += Number(radio.value); }
                });
            }

            // if current question is 7-8, then use the CESum variable
            if(currentQuestion == 7 || currentQuestion == 8){
                radioQ.forEach(radio => {
                    if(radio.checked){ CESum += Number(radio.value); }
                });
            }

            // change the question being displayed
            current.style.display = 'none'; 
            next.style.display = 'block'; 

            // get rid of the warning label
            for(let i = 0; i < warnings.length; i++){
                warnings[i].style.display = "none";
            }
            
            currentQuestion++; 
        } else {
            // otherwise, display a warning above the radiobox section
            for(let i = 0; i < warnings.length; i++){
                warnings[i].style.display = "block";
            }
        }
    } else {
        document.querySelector('.nextButton').style.display = 'none';
    }
}

// checking for color ---------------------------------------------------------------------------------------------

// to roll for a random color scheme
let colorNum = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max); // exclusive
    return Math.floor(Math.random() * (max - min) + min); 
}

// getting a random color scheme (5 color schemes total) (will be the roof)
let chosenColor = baseColor;
let complementaryColor = '';
let analogousColor = '';
let triadColor = '';
let splitComplementaryColor = '';
let tetradColor = '';

// chosen color, if the tinyColor choice is using an array
let colorChoice = 0;

function generateColor() {
    // changes the color so that tinycolor can read it
    // rmb not to pass this through to a normal function bc this variable is a tinycolor object now
    chosenColor = tinycolor(document.querySelector("#Q9").value);

    // roll for random color scheme 1-5
    colorNum = getRandomInt(1, 6); 
    if (colorNum == 1){ 
        complementaryColor = chosenColor.complement().toHexString(); 
        roofColor = complementaryColor;
    }
    if (colorNum == 2){ 
        analogousColor = chosenColor.analogous(results = 6, slices = 5); 
        colorChoice = getRandomInt(2, 5);
        roofColor = analogousColor[colorChoice].toHexString();
    }
    if (colorNum == 3){ 
        triadColor = chosenColor.triad(); 
        colorChoice = getRandomInt(1, 3);
        roofColor = triadColor[colorChoice].toHexString();
    }
    if (colorNum == 4){ 
        splitComplementaryColor = chosenColor.splitcomplement(); 
        colorChoice = getRandomInt(1, 3);
        roofColor = splitComplementaryColor[colorChoice].toHexString();
    }
    if (colorNum == 5){ 
        tetradColor = chosenColor.tetrad();
        colorChoice = getRandomInt(1, 4); 
        roofColor = tetradColor[colorChoice].toHexString();
    }
}

function nextQuestionColor() {    
    let current = document.querySelector('#question' + currentQuestion);
    let next = document.querySelector('#question' + (currentQuestion + 1));
    if (current && next) {
            // save the color in variable
            baseColor = document.querySelector("#Q9").value;

            // generate 1 more color based on this one and store it in variables
            generateColor();

            current.style.display = 'none'; 
            next.style.display = 'block'; 

            currentQuestion++; 
    } else {
        document.querySelector('.nextButton').style.display = 'none';
    }
}

// checking for text input ----------------------------------------------------------------------------------------
function nextQuestionType() {
    let current = document.querySelector('#question' + currentQuestion);
    let next = document.querySelector('#question' + (currentQuestion + 1));
    if (current && next) {
        // checking if the user has typed something
        const inputField = document.querySelector("#Q10");
        const inputValue = inputField.value.trim();

        // if something's been put in, move on
        if (inputValue !== '') {
            current.style.display = 'none'; 
            next.style.display = 'block'; 

            for(let i = 0; i < warnings.length; i++){
                warnings[i].style.display = "none";
            }

            // save the text input
            
            // by the time you click on the next button for Q11 (aka, after this question), 
            // create and assemble SVGs based on the stored variables
            // then send that to firebase

            currentQuestion++; 
        } 
        // if not, show alert and don't move on
        else {
            for(let i = 0; i < warnings.length; i++){
                warnings[i].style.display = "block";
            }
        }
    } else {
        document.querySelector('.nextButton').style.display = 'none';
    }
}

// p5js stuff (runs in background)--------------------------------------------------------------------------------------
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

let svgCanvas;

function setup() {
    svgCanvas = createCanvas(145, 200, SVG);

    noStroke();
    rectMode(CENTER);
    noLoop();
}

function draw() {
    svgCanvas.drawingContext.__clearCanvas();
    // PHYSICAL / BASE ------------------------------------------------------------------------------------------------ 
    
    // WIP COLORS
    if(currentQuestion < 3){
        fill("#000000"); // for black base
    } else if(currentQuestion >= 3 && currentQuestion < 9) {
        fill("#E4E4E4");
    } else if(currentQuestion >= 9){
        fill(baseColor);
    }

    // physical score (2-3)
    if(physicalSum == 2 || physicalSum == 3){
        ellipse(width/3, 129, 61);
        ellipse(width-width/3, 129, 61);
        ellipse(width/3, 169, 61);
        ellipse(width-width/3, 169, 61);
        ellipse(width/2, 150, 50);
    }
    
    // physical score (4-5)
    if(physicalSum == 4 || physicalSum == 5){
        ellipse(width/2, 150, 100);
    }
    
    // physical score (6)
    if(physicalSum == 6){
        let centerX = width/2;
        let centerY = 150;
        let radius = 55;
        // rotates the shape
        let angleOffset = PI / 1.14;
        
        beginShape();
        for (let i = 0; i < 8; i++) {
            // vertex calculations
            let angle = TWO_PI * i / 8 + angleOffset;
            // x+y coords of shape
            let x = centerX + radius * cos(angle);
            let y = centerY + radius * sin(angle);
            // adds vertex to shape
            vertex(x, y);
        }
        endShape(CLOSE); 
    }

    // physical score (7-8)
    if(physicalSum == 7 || physicalSum == 8){
        let centerX = width/2;
        let centerY = 144;
        let radius = 55;
        // rotates the shape
        let angleOffset = PI / 2;
        beginShape();
        for (let i = 0; i < 5; i++) {
            // vertex calculations
            let angle = angleOffset + TWO_PI * i / 5;
            // x+y coords of shape
            let x = centerX + radius * cos(angle);
            let y = centerY + radius * sin(angle);
            // adds vertex to shape
            vertex(x, y);
        }
        endShape(CLOSE); 
    }

    // physical score (9-10)
    if(physicalSum == 9 || physicalSum == 10){
        rect(width/2, 150, 95, 101);
    }

    // BEHAVIORAL / ROOF ------------------------------------------------------------------------------------ 

    // WIP COLORS
    if(currentQuestion >= 3 && currentQuestion < 5){
        fill("#000000"); // for black base
    } else if(currentQuestion >= 5 && currentQuestion < 9) {
        fill("#E4E4E4");
    } else if(currentQuestion >= 9){
        fill(roofColor);
    }

    // behavioral score (2-3)
    if(physicalSum == 2 || physicalSum == 3){
        if(behavioralSum == 2 || behavioralSum == 3){
          push();
            translate(0, -2);
            triangle(0, height/2, width/2, 25, width, height/2);
          pop();
        }
    }
    else if(physicalSum != 2 || physicalSum != 3){
        if(behavioralSum == 2 || behavioralSum == 3){
            triangle(0, height/2, width/2, 25, width, height/2);
        }
    }

    // behavioral score (4-5)
    if(physicalSum == 4 || physicalSum == 5){
        if(behavioralSum == 4 || behavioralSum == 5){
            let centerX = width/2;
            let centerY = 56;
            let radius = 55;
            // rotates the shape
            let angleOffset = PI * 1.5;
            beginShape();
            for (let i = 0; i < 5; i++) {
                // vertex calculations
                let angle = angleOffset + TWO_PI * i / 5;
                // x+y coords of shape
                let x = centerX + radius * cos(angle);
                let y = centerY + radius * sin(angle);
                // adds vertex to shape
                vertex(x, y);
            }
            endShape(CLOSE); 
        }
    }
    else if(physicalSum != 4 || physicalSum != 5){
        if(behavioralSum == 4 || behavioralSum == 5){
            let centerX = width/2;
            let centerY = 55;
            let radius = 55;
            // rotates the shape
            let angleOffset = PI * 1.5;
            beginShape();
            for (let i = 0; i < 5; i++) {
                // vertex calculations
                let angle = angleOffset + TWO_PI * i / 5;
                // x+y coords of shape
                let x = centerX + radius * cos(angle);
                let y = centerY + radius * sin(angle);
                // adds vertex to shape
                vertex(x, y);
            }
            endShape(CLOSE); 
        }
    }

    // behavioral score (6)
    if(behavioralSum == 6){
        let centerX = width/2;
        let centerY = 49;
        let radius = 55;
        // rotates the shape
        let angleOffset = PI / 1.14;
        
        beginShape();
        for (let i = 0; i < 8; i++) {
            // vertex calculations
            let angle = TWO_PI * i / 8 + angleOffset;
            // x+y coords of shape
            let x = centerX + radius * cos(angle);
            let y = centerY + radius * sin(angle);
            // adds vertex to shape
            vertex(x, y);
        }
        endShape(CLOSE); 
    }
    
    // behavioral score (7-8)
    if(physicalSum == 2 || physicalSum == 3){
        if(behavioralSum == 7 || behavioralSum == 8){
            rect(width/2, 51, 95, 95, 100, 100, 0, 0);
        }
    }
    else if(physicalSum == 4 || physicalSum == 5){
        if(behavioralSum == 7 || behavioralSum == 8){
            rect(width/2, 53, 95, 95, 100, 100, 0, 0);
        }
    }
    else if(physicalSum != 2 || physicalSum != 3 || physicalSum != 4 || physicalSum != 5 ){
        if(behavioralSum == 7 || behavioralSum == 8){
            rect(width/2, 55, 95, 95, 100, 100, 0, 0);
        }
    }    
    
    // behavioral score (9-10)
    if(physicalSum == 7 || physicalSum == 8 || physicalSum == 9 || physicalSum == 10){
        if(behavioralSum == 9 || behavioralSum == 10){
            ellipse(width/2, 50, 100);
        }
    }
    else if(physicalSum != 7 || physicalSum != 8 || physicalSum != 9 || physicalSum != 10){
        if(behavioralSum == 9 || behavioralSum == 10){
            ellipse(width/2, 52, 100);
        }
    }

    // SOCIAL / NUMBER OF WINDOWS/FRAMES -------------------------------------------------------------------
    // COGNITIVE/EMOTIONAL / WINDOW SHAPE -------------------------------------------------------------------

    // WIP COLORS
    if(currentQuestion == 5 || currentQuestion == 6){
        fill("#000000"); // for black base
    } else if(currentQuestion >= 7 && currentQuestion < 9) {
        fill("#7A7A7A");
    } else if(currentQuestion >= 9){
        fill("#0283c0");
    }
    //fill("#0283c0");
    
    // social score (2-3)
    if(socialSum == 2 || socialSum == 3){
        if(currentQuestion == 5 || currentQuestion == 6){
            fill("#000000"); // for black base
        } else if(currentQuestion >= 7 && currentQuestion < 9) {
            fill("#7A7A7A");
        } else if(currentQuestion >= 9){
            fill("#0058aa");
        }
        //fill("#0058aa");
        rect(52, 140, 30, 30);
    }
    
    // social score (4-5)
    if(socialSum == 4 || socialSum == 5){
        rect(52, 140, 30, 30);

        if(currentQuestion == 7 || currentQuestion == 8){
            fill("#000000"); // for black base
        } else if(currentQuestion >= 9){
            fill("#0058aa");
        }
        //fill("#0058aa");
        // CE score (2-3)
        if(CESum == 2 || CESum == 3){
            ellipse(52, 140, 25);
        }
        // CE score (4-5)
        if(CESum == 4 || CESum == 5){
            triangle(41, 150, 52, 130, 63, 150);
        }
        // CE score (6)
        if(CESum == 6){
            push();
                let centerX_S6 = 52;
                let centerY_S6 = 140;
                let radius_S6 = 13;
                // rotates the shape
                let angleOffset_S6 = PI / 3;
                
                beginShape();
                for (let i = 0; i < 6; i++) {
                    // vertex calculations
                    let angle = TWO_PI * i / 6 + angleOffset_S6;
                    // x+y coords of shape
                    let x = centerX_S6 + radius_S6 * cos(angle);
                    let y = centerY_S6 + radius_S6 * sin(angle);
                    // adds vertex to shape
                    vertex(x, y);
                }
                endShape(CLOSE); 
            pop();
        }
        // CE score (7-8)
        if(CESum == 7 || CESum == 8){
            let x1 = 38;
            let y1 = 140;
            let x2 = 52;
            let y2 = 126;
            let x3 = 66;
            let y4 = 154;
            beginShape();
                vertex(x1, y1);
                vertex(x2, y2);
                vertex(x3, y1);
                vertex(x2, y4);
            endShape(CLOSE);
        }
        // CE score (9-10)
        if(CESum == 9 || CESum == 10){
            rect(52, 140, 20, 20);
        }
    }

    // social score (6)
    if(socialSum == 6){
        rect(width/2, 140, 71, 30);

        if(currentQuestion == 7 || currentQuestion == 8){
            fill("#000000"); // for black base
        } else if(currentQuestion >= 9){
            fill("#0058aa");
        }
        //fill("#0058aa"); // window color
        // CE score (2-3)
        if(CESum == 2 || CESum == 3){
            ellipse(52, 140, 25);
        }
        // CE score (4-5)
        if(CESum == 4 || CESum == 5){
            triangle(41, 150, 52, 130, 63, 150);
        }
        // CE score (6)
        if(CESum == 6){
            push();
                let centerX_S6 = 52;
                let centerY_S6 = 140;
                let radius_S6 = 13;
                // rotates the shape
                let angleOffset_S6 = PI / 3;
                
                beginShape();
                for (let i = 0; i < 6; i++) {
                    // vertex calculations
                    let angle = TWO_PI * i / 6 + angleOffset_S6;
                    // x+y coords of shape
                    let x = centerX_S6 + radius_S6 * cos(angle);
                    let y = centerY_S6 + radius_S6 * sin(angle);
                    // adds vertex to shape
                    vertex(x, y);
                }
                endShape(CLOSE); 
            pop();
        }
        // CE score (7-8)
        if(CESum == 7 || CESum == 8){
            let x1 = 38;
            let y1 = 140;
            let x2 = 52;
            let y2 = 126;
            let x3 = 66;
            let y4 = 154;
            beginShape();
                vertex(x1, y1);
                vertex(x2, y2);
                vertex(x3, y1);
                vertex(x2, y4);
            endShape(CLOSE);
        }
        // CE score (9-10)
        if(CESum == 9 || CESum == 10){
            rect(52, 140, 20, 20);
        }
    }

    // social score (7-8)
    if(socialSum == 7 || socialSum == 8){
        rect(52, 140, 30, 30);
        rect(93, 140, 30, 30);

        if(currentQuestion == 7 || currentQuestion == 8){
            fill("#000000"); // for black base
        } else if(currentQuestion >= 9){
            fill("#0058aa");
        }
        //fill("#0058aa"); // window color

        // CE score (2-3)
        if(CESum == 2 || CESum == 3){
            ellipse(52, 140, 25);
            ellipse(93, 140, 25);
        }
        // CE score (4-5)
        if(CESum == 4 || CESum == 5){
            triangle(41, 150, 52, 130, 63, 150);
            triangle(41+41, 150, 52+41, 130, 63+41, 150);
        }
        // CE score (6)
        if(CESum == 6){
            push();
                let centerX_S6 = 52;
                let centerY_S6 = 140;
                let radius_S6 = 13;
                // rotates the shape
                let angleOffset_S6 = PI / 3;
                
                beginShape();
                for (let i = 0; i < 6; i++) {
                    // vertex calculations
                    let angle = TWO_PI * i / 6 + angleOffset_S6;
                    // x+y coords of shape
                    let x = centerX_S6 + radius_S6 * cos(angle);
                    let y = centerY_S6 + radius_S6 * sin(angle);
                    // adds vertex to shape
                    vertex(x, y);
                }
                endShape(CLOSE); 
            pop();
            push();
                let centerX_S6_2 = 93;
                let centerY_S6_2 = 140;
                let radius_S6_2 = 13;
                // rotates the shape
                let angleOffset_S6_2 = PI / 3;
                
                beginShape();
                for (let i = 0; i < 6; i++) {
                    // vertex calculations
                    let angle = TWO_PI * i / 6 + angleOffset_S6_2;
                    // x+y coords of shape
                    let x = centerX_S6_2 + radius_S6_2 * cos(angle);
                    let y = centerY_S6_2 + radius_S6_2 * sin(angle);
                    // adds vertex to shape
                    vertex(x, y);
                }
                endShape(CLOSE); 
            pop();
        }
        // CE score (7-8)
        if(CESum == 7 || CESum == 8){
            let x1 = 38;
            let y1 = 140;
            let x2 = 52;
            let y2 = 126;
            let x3 = 66;
            let y4 = 154;
            beginShape();
                vertex(x1, y1);
                vertex(x2, y2);
                vertex(x3, y1);
                vertex(x2, y4);
            endShape(CLOSE);
            push();
            translate(41, 0);
                beginShape();
                    vertex(x1, y1);
                    vertex(x2, y2);
                    vertex(x3, y1);
                    vertex(x2, y4);
                endShape(CLOSE);
            pop();
        }
        // CE score (9-10)
        if(CESum == 9 || CESum == 10){
            rect(52, 140, 20, 20);
            rect(93, 140, 20, 20);
        }
    }

    // social score (9-10) IF IT'S A TRIANGLE ROOF
    if(behavioralSum == 2 || behavioralSum == 3){
        if(socialSum == 9 || socialSum == 10){
            rect(52, 140, 30, 30);
            rect(93, 140, 30, 30);
            rect(width/2, 70, 30, 30);
    
            if(currentQuestion == 7 || currentQuestion == 8){
                fill("#000000"); // for black base
            } else if(currentQuestion >= 9){
                fill("#0058aa");
            }
            //fill("#0058aa"); // window color
    
            // CE score (2-3)
            if(CESum == 2 || CESum == 3){
                ellipse(52, 140, 25);
                ellipse(93, 140, 25);
                ellipse(width/2, 70, 25);
            }
            // CE score (4-5)
            if(CESum == 4 || CESum == 5){
                triangle(41, 150, 52, 130, 63, 150);
                triangle(41+41, 150, 52+41, 130, 63+41, 150);
                push();
                    translate(20, -70);
                    triangle(41, 150, 52, 130, 63, 150);
                pop();
            }
            // CE score (6)
            if(CESum == 6){
                push();
                    let centerX_S6 = 52;
                    let centerY_S6 = 140;
                    let radius_S6 = 13;
                    // rotates the shape
                    let angleOffset_S6 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6;
                        // x+y coords of shape
                        let x = centerX_S6 + radius_S6 * cos(angle);
                        let y = centerY_S6 + radius_S6 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
                push();
                    let centerX_S6_2 = 93;
                    let centerY_S6_2 = 140;
                    let radius_S6_2 = 13;
                    // rotates the shape
                    let angleOffset_S6_2 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6_2;
                        // x+y coords of shape
                        let x = centerX_S6_2 + radius_S6_2 * cos(angle);
                        let y = centerY_S6_2 + radius_S6_2 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
                push();
                    translate(-20.5, -70);
                    let centerX_S6_3 = 93;
                    let centerY_S6_3 = 140;
                    let radius_S6_3 = 13;
                    // rotates the shape
                    let angleOffset_S6_3 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6_3;
                        // x+y coords of shape
                        let x = centerX_S6_3 + radius_S6_3 * cos(angle);
                        let y = centerY_S6_3 + radius_S6_3 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
            }
            // CE score (7-8)
            if(CESum == 7 || CESum == 8){
                let x1 = 38;
                let y1 = 140;
                let x2 = 52;
                let y2 = 126;
                let x3 = 66;
                let y4 = 154;
                beginShape();
                    vertex(x1, y1);
                    vertex(x2, y2);
                    vertex(x3, y1);
                    vertex(x2, y4);
                endShape(CLOSE);
                push();
                translate(41, 0);
                    beginShape();
                        vertex(x1, y1);
                        vertex(x2, y2);
                        vertex(x3, y1);
                        vertex(x2, y4);
                    endShape(CLOSE);
                pop();
                push();
                translate(20.5, -70);
                    beginShape();
                        vertex(x1, y1);
                        vertex(x2, y2);
                        vertex(x3, y1);
                        vertex(x2, y4);
                    endShape(CLOSE);
                pop();
            }
            // CE score (9-10)
            if(CESum == 9 || CESum == 10){
                rect(52, 140, 20, 20);
                rect(93, 140, 20, 20);
                rect(width/2, 70, 20, 20);
            }
        }
    }
    // social score (9-10) FOR EVERYTHING ELSE
    else if(behavioralSum != 2 || behavioralSum != 3){
        if(socialSum == 9 || socialSum == 10){
            rect(52, 140, 30, 30);
            rect(93, 140, 30, 30);
            rect(width/2, 55, 30, 30);
    
            if(currentQuestion == 7 || currentQuestion == 8){
                fill("#000000"); // for black base
            } else if(currentQuestion >= 9){
                fill("#0058aa");
            }
            //fill("#0058aa"); // window color
    
            // CE score (2-3)
            if(CESum == 2 || CESum == 3){
                ellipse(52, 140, 25);
                ellipse(93, 140, 25);
                ellipse(width/2, 55, 25);
            }
            // CE score (4-5)
            if(CESum == 4 || CESum == 5){
                triangle(41, 150, 52, 130, 63, 150);
                triangle(41+41, 150, 52+41, 130, 63+41, 150);
                push();
                    translate(20, -85);
                    triangle(41, 150, 52, 130, 63, 150);
                pop();
            }
            // CE score (6)
            if(CESum == 6){
                push();
                    let centerX_S6 = 52;
                    let centerY_S6 = 140;
                    let radius_S6 = 13;
                    // rotates the shape
                    let angleOffset_S6 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6;
                        // x+y coords of shape
                        let x = centerX_S6 + radius_S6 * cos(angle);
                        let y = centerY_S6 + radius_S6 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
                push();
                    let centerX_S6_2 = 93;
                    let centerY_S6_2 = 140;
                    let radius_S6_2 = 13;
                    // rotates the shape
                    let angleOffset_S6_2 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6_2;
                        // x+y coords of shape
                        let x = centerX_S6_2 + radius_S6_2 * cos(angle);
                        let y = centerY_S6_2 + radius_S6_2 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
                push();
                    translate(-20.5, -85)
                    let centerX_S6_3 = 93;
                    let centerY_S6_3 = 140;
                    let radius_S6_3 = 13;
                    // rotates the shape
                    let angleOffset_S6_3 = PI / 3;
                    
                    beginShape();
                    for (let i = 0; i < 6; i++) {
                        // vertex calculations
                        let angle = TWO_PI * i / 6 + angleOffset_S6_3;
                        // x+y coords of shape
                        let x = centerX_S6_3 + radius_S6_3 * cos(angle);
                        let y = centerY_S6_3 + radius_S6_3 * sin(angle);
                        // adds vertex to shape
                        vertex(x, y);
                    }
                    endShape(CLOSE); 
                pop();
            }
            // CE score (7-8)
            if(CESum == 7 || CESum == 8){
                let x1 = 38;
                let y1 = 140;
                let x2 = 52;
                let y2 = 126;
                let x3 = 66;
                let y4 = 154;
                beginShape();
                    vertex(x1, y1);
                    vertex(x2, y2);
                    vertex(x3, y1);
                    vertex(x2, y4);
                endShape(CLOSE);
                push();
                translate(41, 0);
                    beginShape();
                        vertex(x1, y1);
                        vertex(x2, y2);
                        vertex(x3, y1);
                        vertex(x2, y4);
                    endShape(CLOSE);
                pop();
                push();
                translate(20.5, -85);
                    beginShape();
                        vertex(x1, y1);
                        vertex(x2, y2);
                        vertex(x3, y1);
                        vertex(x2, y4);
                    endShape(CLOSE);
                pop();
            }
            // CE score (9-10)
            if(CESum == 9 || CESum == 10){
                rect(52, 140, 20, 20);
                rect(93, 140, 20, 20);
                rect(width/2, 55, 20, 20);
            }
        }
    }
}

// firebase; saves what's on the canvas + the text data to firebase storage + realtime database respectively
function saveData() {
    // get the data URL of the saved image
    let canvasDataURL = canvas.toDataURL('image/svg+xml');

    // allows you to put in images into the firebase storage
    let storageRef = firebase.storage().ref();

    // give this SVG a specific ID so we can ref which file to pull
    id = Date.now();

    // give the file a unique name starting with the date
    let filename = Date.now() + '_home.svg';

    // uploads the file name and image to firebase
    let uploadTask = storageRef.child(filename).putString(canvasDataURL, 'data_url');

    // saves what the user put in as input (will need to replace with the variable we will save in the actual file)
    // might not have to actually use a variable if the value will just be put in
    shortResponse = document.getElementById('Q10').value;

    // Save the text input data and associate it with the SVG ID in Firebase Realtime Database
    database.ref('svgUserData/' + id).set({
        userInput: textInput,
        svgId: id,
        fileName: filename
    });

    console.log("uploaded");
}