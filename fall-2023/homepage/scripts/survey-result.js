// moving the p5 canvas to the correct section ------------------------------------------------------------------------------------------------------
setTimeout(() => {
    $("#defaultCanvas0").appendTo("#canvas");
}, 500);


// for switching bt the survey quiz section and the survey results section
let surveySection = document.querySelector("#surveyQuiz");
let surveyResults = document.querySelector("#surveyResults");

function switchToResults() {
    surveySection.style.display = "none";
    surveyResults.style.display = "block";
    surveyResults.style.visibility = "hidden";
}

// IG stuff ------------------------------------------------------------------------------------------------------

// function captureAndRedirect() {
//     const elementToCapture = document.getElementById('capture');

//     // show certain elements before continuing 
//     document.querySelector("#surveyLink").style.display = "block";

//     // hide certain elements before continuing
//     // the part that will be sent to IG
//     // returns nodelist so use foreach
//     let hideElements = document.querySelectorAll(".hide");
//     hideElements.forEach(function(el) {
//         el.style.display = "none";
//      });

//     setTimeout( () => {
//         html2canvas(elementToCapture).then(canvas => {
//             // Convert canvas to base64 Data URL
//             const imageUrl = canvas.toDataURL('image/png');
        
//             // Redirect user to Instagram with the captured image preloaded if Instagram is installed
//             const instagramShareUrl = `instagram://library?AssetPath=${encodeURIComponent(imageUrl)}`;
        
//             // Check if the Instagram app is installed, then redirect accordingly
//             window.location.href = instagramShareUrl;
//             setTimeout(() => {
//               if (document.hidden || document.webkitHidden) {
//                 window.location.href = 'https://www.instagram.com/';
//               }
//             }, 50);
//           });
//     }, 100);

//     // hide and show the elements again
//     setTimeout( () => {
//         document.querySelector("#surveyLink").style.display = "none";
//         hideElements.forEach(function(el) {
//             el.style.display = "block";
//          });
//     }, 200);
// }

// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (isMobile) { 
//     document.querySelector("#shareToIG").onclick = function () {
//         captureAndRedirect();
//     };
//     console.log("mobile device!");
// } else {
//     document.querySelector("#shareToIG").classList.add("gray");
//     document.querySelector("#shareToIG").classList.remove("pointer");
//     console.log("not mobile");
// }

// animate the car ------------------------------------------------------------------------------------------------------
let car = document.querySelector("#carWrapper");

function finishQuiz() {
    surveyResults.style.visibility = "visible";
    car.style.display = "block";
    car.animate([
        { left: '-70%' }, 
        { left: 'calc(100vw/2.5)' }, 
        { left: 'calc(100vw/2.5)' }, 
        { left: 'calc(100vw/2.5)' }, 
        { left: '140%' } 
      ], {
        duration: 7000, 
        easing: 'ease-in-out', 
        iterations: 1, 
    });
    setTimeout(() => {
        document.querySelector("#canvas").style.opacity = "1";
    }, 2500);
    setTimeout(() => {
        car.style.display = "none";
    }, 6500);

    setTimeout(() => {
        // reveal the rest of the results
        document.querySelector("#surveyHeader").style.opacity = "1";
        document.querySelector("#resultMessage").style.opacity = "1";
        document.querySelector("#preferences").style.opacity = "1";
        document.querySelector("#surveyReport").style.opacity = "1";
        document.querySelector("#postQuiz").style.opacity = "1";
        document.querySelector("#moreInfo").style.opacity = "1";

        // confetti post quiz
        // duration
        const end = Date.now() + 5 * 300;
        const colors = ["#0040F0", "#088902", "#FFD72A", "#ff718d", "#fdff6a", "#29ABE2"];

        (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        })();
    }, 5000);
}


// choosing a random affirming message post quiz ------------------------------------------------------------------------------------------------------
let resultMessage = document.querySelector("#resultMessage");
let myRoll = getRandomInt(0, 6);

if(myRoll == 0){
    resultMessage.innerHTML = "This may be a small part of you, but it’s a home nonetheless."; // set text input as the content of the span
}
if(myRoll == 1){
    resultMessage.innerHTML = "... but this result is just one piece of a much bigger picture."; 
}
if(myRoll == 2){
    resultMessage.innerHTML = "This result doesn't define you, and it can mean so much more."; 
}
if(myRoll == 3){
    resultMessage.innerHTML = "... but this represents just a tiny glimpse into a lifetime of experiences."; 
}
if(myRoll == 4){
    resultMessage.innerHTML = "... but this only shows a tiny snapshot of your unique view on “home”."; 
}
if(myRoll == 5){
    resultMessage.innerHTML = "... but this represents only a fraction of what home could really mean for you."; 
}


// loads in the bar ------------------------------------------------------------------------------------------------------
// bar fraction
let behaviorBar = document.querySelector("#behaviorBar");
let physicalBar = document.querySelector("#physicalBar");
let socialBar = document.querySelector("#socialBar");
let CEBar = document.querySelector("#CEBar");

function barLoad(id, sum) {
    // add full blocks
    for(i = 0; i < sum; i++){ id.innerHTML += "&#9608;" }
    // adds shaded blocks
    for(i = 0; i < 10 - sum; i++){ id.innerHTML += "&#9617;" }
}


// loads in color response ------------------------------------------------------------------------------------------------------
function hexToRGB(hex) {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}
// check for color contrast bt bg and color
function contrastChecker(el, r, g, b){
    // can adjust last value to adjust threshold
    if ((r*0.299 + g*0.587 + b*0.114) > 186){ el.style.color = "#000000";} 
    else { el.style.color = "#ffffff"; }
}

function updateInfo() {
    let colorSquare1 = document.querySelector("#colorSquare1");
    let colorSquare2 = document.querySelector("#colorSquare2");
    colorSquare1.style.backgroundColor = baseColor;
    colorSquare2.style.backgroundColor = roofColor;

    // save text response to example text bubble ------------------------------------------------------------------------------------------------------
    let exampleText = document.querySelector("#exampleText");

    let myRoll2 = getRandomInt(0, 4);
    if(myRoll2 == 0){
        exampleText.innerHTML = "Home is born from <b>" + shortResponse + "</b>"; // Set text input as the content of the span
    }
    if(myRoll2 == 1){
        exampleText.innerHTML = "Home isn't complete without <b>" + shortResponse + "</b>"; 
    }
    if(myRoll2 == 2){
        exampleText.innerHTML = "Home is full of <b>" + shortResponse + "</b>"; 
    }
    if(myRoll2 == 3){
        exampleText.innerHTML = "Home is made from lots of <b>" + shortResponse + "</b>"; 
    }

    // showing the correct response in the scale ------------------------------------------------------------------------------------------------------
    if(behavioralSum < 4){ 
        document.querySelector("#b1").src = "images/houseParts/roof-1.svg";
        document.querySelector("#beh").src = "images/houseParts/roof-1.svg"
    }
    else if(behavioralSum == 4 || behavioralSum == 5){ 
        document.querySelector("#b2").src = "images/houseParts/roof-2.svg"; 
        document.querySelector("#beh").src = "images/houseParts/roof-2.svg";
}
    else if(behavioralSum == 6){ 
        document.querySelector("#b3").src = "images/houseParts/roof-3.svg" 
        document.querySelector("#beh").src = "images/houseParts/roof-3.svg";
}
    else if(behavioralSum == 7 || behavioralSum == 8){ 
        document.querySelector("#b4").src = "images/houseParts/roof-4.svg" 
        document.querySelector("#beh").src = "images/houseParts/roof-4.svg";
}
    else if(behavioralSum == 9 || behavioralSum == 10){ 
        document.querySelector("#b5").src = "images/houseParts/roof-5.svg" 
        document.querySelector("#beh").src = "images/houseParts/roof-5.svg";
}

    if(physicalSum < 4){ 
        document.querySelector("#p1").src = "images/houseParts/base-1.svg" 
        document.querySelector("#phy").src = "images/houseParts/base-1.svg" 
}
    else if(physicalSum == 4 || physicalSum == 5){ 
        document.querySelector("#p2").src = "images/houseParts/base-2.svg" 
        document.querySelector("#phy").src = "images/houseParts/base-2.svg" 
}
    else if(physicalSum == 6){ 
        document.querySelector("#p3").src = "images/houseParts/base-3.svg" 
        document.querySelector("#phy").src = "images/houseParts/base-3.svg" 
}
    else if(physicalSum == 7 || physicalSum == 8){ 
        document.querySelector("#p4").src = "images/houseParts/base-4.svg" 
        document.querySelector("#phy").src = "images/houseParts/base-4.svg" 
    }
    else if(physicalSum == 9 || physicalSum == 10){ 
        document.querySelector("#p5").src = "images/houseParts/base-5.svg" 
        document.querySelector("#phy").src = "images/houseParts/base-5.svg" 
}

    if(socialSum < 4){ 
        document.querySelector("#s1").src = "images/houseParts/SOC-1.svg" 
        document.querySelector("#soc").src = "images/houseParts/SOC-1.svg" 
    }
    else if(socialSum == 4 || socialSum == 5){ 
        if(CESum < 4){
            document.querySelector("#s2").src = "images/houseParts/CE-1.svg" 
            document.querySelector("#soc").src = "images/houseParts/CE-1.svg" 
    }
        else if(CESum == 4 || CESum == 5){
            document.querySelector("#s2").src = "images/houseParts/CE-2.svg" 
            document.querySelector("#soc").src = "images/houseParts/CE-2.svg" 
    }
        else if(CESum == 6){
            document.querySelector("#s2").src = "images/houseParts/CE-3.svg" 
            document.querySelector("#soc").src = "images/houseParts/CE-3.svg" 
    }
        else if(CESum == 7 || CESum == 8){
            document.querySelector("#s2").src = "images/houseParts/CE-4.svg" 
            document.querySelector("#soc").src = "images/houseParts/CE-4.svg" 
    }
        else if(CESum == 9 || CESum == 10){
            document.querySelector("#s2").src = "images/houseParts/CE-5.svg" 
            document.querySelector("#soc").src = "images/houseParts/CE-5.svg" 
    }
    }
    else if(socialSum == 6){ 
        if(CESum < 4){
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-1.svg" 
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-1.svg" 
    }
        else if(CESum == 4 || CESum == 5){
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-2.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-3-CE-2.svg" 
    }
        else if(CESum == 6){
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-3.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-3-CE-3.svg" 
    }
        else if(CESum == 7 || CESum == 8){
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-4.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-3-CE-4.svg" 
    }
        else if(CESum == 9 || CESum == 10){
            document.querySelector("#s3").src = "images/houseParts/SOC-3-CE-5.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-3-CE-5.svg" 
    }
    }
    else if(socialSum == 7 || socialSum == 8){ 
        if(CESum < 4){
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-1.svg" 
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-1.svg" 
    }
        else if(CESum == 4 || CESum == 5){
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-2.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-4-CE-2.svg" 
    }
        else if(CESum == 6){
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-3.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-4-CE-3.svg" 
    }
        else if(CESum == 7 || CESum == 8){
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-4.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-4-CE-4.svg" 
    }
        else if(CESum == 9 || CESum == 10){
            document.querySelector("#s4").src = "images/houseParts/SOC-4-CE-5.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-4-CE-5.svg" 
    }
    }
    else if(socialSum == 9 || socialSum == 10){ 
        if(CESum < 4){
            document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-1.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-5-CE-1.svg" 
    }
        else if(CESum == 4 || CESum == 5){
            document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-2.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-5-CE-2.svg" 
    }
        else if(CESum == 6){
            document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-3.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-5-CE-3.svg" 
    }
        else if(CESum == 7 || CESum == 8){
            document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-4.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-5-CE-4.svg" 
    }
        else if(CESum == 9 || CESum == 10){
            document.querySelector("#s5").src = "images/houseParts/SOC-5-CE-5.svg" 
            document.querySelector("#soc").src = "images/houseParts/SOC-5-CE-5.svg" 
    }
    }

    if(CESum < 4){
        document.querySelector("#ce1").src = "images/houseParts/CE-1.svg" 
        document.querySelector("#cogem").src = "images/houseParts/CE-1.svg"  
}
    else if(CESum == 4 || CESum == 5){
        document.querySelector("#ce2").src = "images/houseParts/CE-2.svg" 
        document.querySelector("#cogem").src = "images/houseParts/CE-2.svg" 
}
    else if(CESum == 6){
        document.querySelector("#ce3").src = "images/houseParts/CE-3.svg" 
        document.querySelector("#cogem").src = "images/houseParts/CE-3.svg" 
}
    else if(CESum == 7 || CESum == 8){
        document.querySelector("#ce4").src = "images/houseParts/CE-4.svg" 
        document.querySelector("#cogem").src = "images/houseParts/CE-4.svg" 
}
    else if(CESum == 9 || CESum == 10){
        document.querySelector("#ce5").src = "images/houseParts/CE-5.svg" 
        document.querySelector("#cogem").src = "images/houseParts/CE-5.svg" 
}

    barLoad(behaviorBar, behavioralSum);
    barLoad(physicalBar, physicalSum);
    barLoad(socialBar, socialSum);
    barLoad(CEBar, CESum);

    // text fraction
    document.querySelector("#behaviorFraction").innerHTML = behavioralSum + "/10"
    document.querySelector("#physicalFraction").innerHTML = physicalSum + "/10"
    document.querySelector("#socialFraction").innerHTML = socialSum + "/10"
    document.querySelector("#CEFraction").innerHTML = CESum + "/10"

    let colorBox = document.querySelector("#colorBox");
    let moreInfoHeader1 = document.querySelector("#titleBox1");
    let moreInfoHeader2 = document.querySelector("#titleBox2");
    colorBox.innerHTML = baseColor;
    colorBox.style.backgroundColor = baseColor;

    moreInfoHeader1.style.backgroundColor = baseColor;
    moreInfoHeader2.style.backgroundColor = roofColor;
    
    // split the colors of baseColor into RGB values
    let splitHexBase = hexToRGB(baseColor);
    // turns it into an array: [[r, #], [g, #], [b, #]]
    let splitBaseHexArray = Object.keys(splitHexBase).map((key) => [key, splitHexBase[key]]);
    // check for contrast and change the text color
    contrastChecker(colorBox, splitBaseHexArray[0][1], splitBaseHexArray[1][1], splitBaseHexArray[2][1]);
    contrastChecker(moreInfoHeader1, splitBaseHexArray[0][1], splitBaseHexArray[1][1], splitBaseHexArray[2][1]);
    contrastChecker(moreInfoHeader2, splitBaseHexArray[0][1], splitBaseHexArray[1][1], splitBaseHexArray[2][1]);

    let splitHexRoof = hexToRGB(roofColor);
    let splitRoofHexArray = Object.keys(splitHexRoof).map((key) => [key, splitHexRoof[key]]);
    contrastChecker(colorBox, splitRoofHexArray[0][1], splitRoofHexArray[1][1], splitRoofHexArray[2][1]);
    contrastChecker(moreInfoHeader1, splitRoofHexArray[0][1], splitRoofHexArray[1][1], splitRoofHexArray[2][1]);
    contrastChecker(moreInfoHeader2, splitRoofHexArray[0][1], splitRoofHexArray[1][1], splitRoofHexArray[2][1]);

    // loads in text response ------------------------------------------------------------------------------------------------------
    let textBox = document.querySelector("#textBox");
    textBox.innerHTML = `<b>${shortResponse}</b>`
}


// downloads results to PDF ------------------------------------------------------------------------------------------------------
function downloadToPDF() {
    var PDFsection = document.getElementById('surveyResults');
    // html2pdf(PDFsection);
    var opt = {
        margin: 5,
        filename: 'my-home-results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        pagebreak: { mode: 'legacy' }
    };
    html2pdf().set(opt).from(PDFsection).save();
}