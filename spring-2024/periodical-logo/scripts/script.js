var apiCheck = document.querySelector("#apiCheck");
var userCheck = document.querySelector("#userCheck");
var controls = document.querySelector("#controls");
var fontControls = document.querySelectorAll(".font-controls");

// change this text
var tempText = document.querySelector("#tempText");
var humidityText = document.querySelector("#humidityText");

let temp = 93;
let humidity = 34;

var weightControl = document.querySelector("#weightControl");
var widthControl = document.querySelector("#widthControl");
var colorControl = document.querySelector("#textColor");
var burnControl = document.querySelector("#burnControl");
var logoTop = document.querySelector("#logo-top");
var logoBottom = document.querySelector("#logo-bottom");


// FUNCTIONS ---------------------------------------------------------------------

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// API CONTROLS ---------------------------------------------------------------------

// syracuse university (where the magazine/demographic is located) location
let lat = 43.039230478330744;
let long = -76.1333917925887;

// get user weather with API
// weather API used: https://rapidapi.com/weatherapi/api/weatherapi-com/
//                                                             vvv lat / long (after C)
const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${long}`;

// const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + stringLat + '%2C' + stringLong;

console.log(url);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2ffcd1e2c4mshd0dda41247d0f1fp1521d4jsnab304d1d368b',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        const jsonified = JSON.parse(result);

        // to get a value from the json, need to: jsonified.key.key(...)
        // replace the weather values
        temp = jsonified.current.temp_f;
        humidity = jsonified.current.humidity;

        // replace variables with weather data

        // TEMP / WIDTH/BURN
        // change temp value to be between -20f - 95f, and the width 70-115 %
        let newTemp = Math.round(map(temp, -20, 95, 70, 115));

        // if temp exceeds 70, increase the burn value
        if (temp > 70 && temp <= 72) {
            logoTop.style.opacity = 0.1;
        } else if (temp > 72 && temp <= 74) {
            logoTop.style.opacity = 0.2;
        } else if (temp > 74 && temp <= 76) {
            logoTop.style.opacity = 0.3;
        } else if (temp > 76 && temp <= 78) {
            logoTop.style.opacity = 0.4;
        } else if (temp > 80 && temp <= 82) {
            logoTop.style.opacity = 0.4;
        } else if (temp > 82 && temp <= 84) {
            logoTop.style.opacity = 0.5;
        } else if (temp > 86 && temp <= 88) {
            logoTop.style.opacity = 0.6;
        } else if (temp == 89) {
            logoTop.style.opacity = 0.7;
        } else if (temp == 90) {
            logoTop.style.opacity = 0.8;
        } else if (temp == 91) {
            logoTop.style.opacity = 0.9;
        } else if (temp >= 92) {
            logoTop.style.fontWeight = 115 + "%";
            logoTop.style.opacity = 1;
            logoBottom.style.fontWeight = 115 + "%";
        }

        if (temp <= -20) {
            logoTop.style.fontWeight = 70 + "%";
            logoTop.style.opacity = 0;
            logoBottom.style.fontWeight = 70 + "%";
        }

        // HUMIDITY / WEIGHT

        // change humidity value to be between 30% - 85%, and the weight 400-900
        let newHumidity = Math.round(map(humidity, 30, 85, 400, 900));
        if (humidity <= 30) {
            logoTop.style.fontWeight = 400;
            logoBottom.style.fontWeight = 400;  
        } else if (humidity >= 85) {
            logoTop.style.fontWeight = 900;
            logoBottom.style.fontWeight = 900;  
        }

        // replace values + text
        logoTop.style.fontWeight = newHumidity;
        logoBottom.style.fontWeight = newHumidity;
        logoTop.style.fontStretch = newTemp + "%";
        logoBottom.style.fontStretch = newTemp + "%";

        tempText.innerHTML = "Temperature: " + temp + "°F";
        humidityText.innerHTML = "Humidity: " + humidity + "%";

        console.log("temp:" + jsonified.current.temp_f);
        console.log("humid:" + jsonified.current.humidity);
        console.log("temp var:" + temp);
        console.log("humid var:" + humidity);

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

// USER CONTROLS ---------------------------------------------------------------------

// check if the radio boxes are checked and show things accordingly
setInterval(function() {
    if(userCheck.checked) {
        for(let i = 0; i < fontControls.length; i++) {
            fontControls[i].style.display = "block";
        }
    } else {
        for(let i = 0; i < fontControls.length; i++) {
            fontControls[i].style.display = "none";
        }
    }
    if(apiCheck.checked) {
        tempText.style.opacity = "1";
        humidityText.style.opacity = "1";
    } else {
        tempText.style.opacity = "0.5";
        humidityText.style.opacity = "0.5";
    }
}, 100);

// font controls
weightControl.oninput = function() {
    logoTop.style.fontWeight = weightControl.value;
    logoBottom.style.fontWeight = weightControl.value;
}
widthControl.oninput = function() {
    logoTop.style.fontStretch = widthControl.value + "%";
    logoBottom.style.fontStretch = widthControl.value + "%";
}
colorControl.oninput = function() {
    logoBottom.style.color = colorControl.value;
    logoBottom.style.webkitTextStrokeColor = colorControl.value;
}
burnControl.oninput = function() {
    logoTop.style.opacity = burnControl.value;
}

// download text
// using dom to image library to download as PNG: https://www.youtube.com/watch?v=-PivAoyK9OQ
document.querySelector('#download').addEventListener('click', function() {
    domtoimage.toBlob(document.getElementById("textContainer"))
    .then(function(blob){
        window.saveAs(blob, "logo.png");
    })
});