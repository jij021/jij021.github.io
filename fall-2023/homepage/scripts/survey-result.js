// for switching bt the survey quiz section and the survey results section
let surveySection = document.querySelector("#surveyQuiz");
let surveyResults = document.querySelector("#surveyResults");

function switchToResults() {
    surveySection.style.display = "none";
    surveyResults.style.display = "block";
    surveyResults.style.visibility = "hidden";
}

// IG stuff ------------------------------------------------------------------------------------------------------

function captureAndRedirect() {
    const elementToCapture = document.getElementById('capture');

    // show certain elements before continuing 
    document.querySelector("#surveyLink").style.display = "block";

    // hide certain elements before continuing
    // the part that will be sent to IG
    // returns nodelist so use foreach
    let hideElements = document.querySelectorAll(".hide");
    hideElements.forEach(function(el) {
        el.style.display = "none";
     });

    setTimeout( () => {
        html2canvas(elementToCapture).then(canvas => {
            // Convert canvas to base64 Data URL
            const imageUrl = canvas.toDataURL('image/png');
        
            // Redirect user to Instagram with the captured image preloaded if Instagram is installed
            const instagramShareUrl = `instagram://library?AssetPath=${encodeURIComponent(imageUrl)}`;
        
            // Check if the Instagram app is installed, then redirect accordingly
            window.location.href = instagramShareUrl;
            setTimeout(() => {
              if (document.hidden || document.webkitHidden) {
                window.location.href = 'https://www.instagram.com/';
              }
            }, 50);
          });
    }, 100);

    // hide and show the elements again
    setTimeout( () => {
        document.querySelector("#surveyLink").style.display = "none";
        hideElements.forEach(function(el) {
            el.style.display = "block";
         });
    }, 200);
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) { 
    document.querySelector("#shareToIG").onclick = function () {
        captureAndRedirect();
    };
    console.log("mobile device!");
} else {
    document.querySelector("#shareToIG").classList.add("gray");
    document.querySelector("#shareToIG").classList.remove("pointer");
    console.log("not mobile");
}

// animate the car ------------------------------------------------------------------------------------------------------
let car = document.querySelector("#carWrapper");

function finishQuiz() {
    surveyResults.style.visibility = "visible";
    car.style.display = "block";
    car.animate([
        { left: '-100%' }, 
        { left: '40%' }, 
        { left: '40%' }, 
        { left: '40%' }, 
        { left: '140%' } 
      ], {
        duration: 8000, 
        easing: 'ease-in-out', 
        iterations: 1, 
    });
    setTimeout(() => {
        document.querySelector("#canvas").style.opacity = "1";
    }, 3500);
    setTimeout(() => {
        car.style.display = "none";
    }, 7500);

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
    }, 6000);
}

// moving the p5 canvas to the correct section ------------------------------------------------------------------------------------------------------
setTimeout(() => {
    $("#defaultCanvas0").appendTo("#canvas");
}, 500);


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
    var opt = {
        margin: 5,
        filename: 'my-home-results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        pagebreak: { mode: 'avoid-all'}
      };
    html2pdf().set(opt).from(PDFsection).save();
}