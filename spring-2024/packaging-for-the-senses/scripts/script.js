const dataParent = document.getElementById("packaging-data");

// save your sheet ID and name of the tab as variables for use
let sheetID = "15E8Nb5IM2k0uqapKhQCJraX2wU58dkWT9sDQNH68-Z8";
let tabName = 'Sheet1'

// format them into Ben's uri
let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`

console.log(opensheet_uri);

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

fetch(opensheet_uri)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
		// making a unique package based on the data
        for (let datapoint of data) {
            // make packages 
        	let newPackage = document.createElement("DIV");
            newPackage.classList.add("packaging-container");

            // making text container
            let newText = document.createElement("DIV");
            newText.classList.add("text");
            // making the stuff that goes into the text container
            // logo
            newText.innerHTML = `
                <svg class="stash-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.26 80.19">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #2d2a2a;
                        stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <g id="logo">
                    <path class="cls-1" d="M0,40.08c4.05-2.47,7.44-6.09,12.29-6.9,2.12-.36,3.07-1.27,3.66-3.22.42-1.41,1.31-2.71,2.09-3.99.44-.73.44-1.26.16-2.1-.77-2.37-1.29-4.81-1.98-7.49,2.98.51,5.59.59,7.98,1.8.38.19,1.01.17,1.41-.01,2.15-.98,4.26-2.03,6.37-3.09.32-.16.76-.45.79-.72.49-3.89,2.25-7.19,4.57-10.26.98-1.3,1.88-2.67,2.87-4.09,2.94,4.49,6.81,8.47,7.41,14.19.03.3.37.68.66.82,2.18,1.1,4.37,2.18,6.6,3.18.39.18.97.08,1.43-.04,2.46-.63,4.92-1.31,7.67-2.05-.48,2.98-.53,5.59-1.81,7.94-.33.6-.25,1.04.09,1.67,1.08,2,2,4.09,3.02,6.12.17.34.5.8.81.84,3.45.46,6.48,1.88,9.28,3.88,1.65,1.18,3.31,2.35,5.04,3.58-4.02,2.42-7.35,6.03-12.17,6.85-2.18.37-3.2,1.36-3.82,3.38-.46,1.49-1.47,2.8-2.18,4.22-.18.35-.3.84-.2,1.2.7,2.61,1.46,5.2,2.2,7.79-.14.15-.28.29-.42.44-2.53-.68-5.05-1.38-7.59-2.02-.45-.11-1.02-.14-1.42.04-2.15.98-4.27,2.02-6.37,3.09-.33.17-.76.53-.8.85-.43,3.14-1.64,5.96-3.42,8.55-1.3,1.88-2.65,3.73-4.01,5.64-2.96-4.49-6.84-8.52-7.41-14.3-.03-.26-.38-.56-.65-.7-2.19-1.09-4.38-2.17-6.6-3.18-.39-.18-.97-.07-1.42.05-2.46.63-4.92,1.3-7.66,2.03.47-2.98.54-5.6,1.81-7.94.34-.62.23-1.05-.09-1.66-1.07-2.01-2-4.09-3.01-6.13-.16-.32-.44-.8-.7-.83-3.95-.46-7.28-2.27-10.4-4.6-1.3-.97-2.66-1.87-4.06-2.85ZM56.42,46.47c-3.39-1.1-6.08-2.95-8.67-4.95-.35-.27-.75-.54-1.16-.64-1.73-.4-3.89.63-4.91,2.35-.83,1.4-1.18,2.96.29,4.97,1.64,2.26,2.91,4.79,4.34,7.2.14.23.24.48.4.83,1.01-.53,1.94-1.02,2.76-1.45-.4-2.25-.76-4.35-1.16-6.61,2.29.4,4.4.77,6.63,1.17.44-.85.92-1.78,1.48-2.88ZM48.3,32.04c.41-2.32.79-4.39,1.19-6.63-.86-.44-1.81-.92-2.87-1.46-1.17,3.46-3.09,6.23-5.18,8.9-.2.25-.36.55-.44.86-.42,1.66.62,3.87,2.33,4.92,1.31.8,3.1,1.25,4.88-.19,1.45-1.18,3.06-2.19,4.67-3.15,1.06-.64,2.25-1.07,3.51-1.64-.52-1-1-1.93-1.44-2.77-2.24.39-4.35.76-6.64,1.16ZM32.14,48.17c-.41,2.3-.78,4.4-1.17,6.64.88.45,1.84.93,2.86,1.44,1.13-3.27,2.85-5.93,4.84-8.43.35-.43.66-.97.77-1.5.35-1.8-.7-3.86-2.45-4.83-1.47-.81-2.97-1.04-4.88.37-2.02,1.49-4.27,2.68-6.44,3.97-.47.28-1.01.45-1.63.71.55,1.05,1.04,1.97,1.47,2.79,2.23-.39,4.3-.76,6.62-1.17ZM33.83,23.95c-1.07.55-2.02,1.04-2.86,1.47.4,2.28.76,4.38,1.16,6.62-2.31-.41-4.42-.78-6.63-1.17-.45.88-.92,1.81-1.26,2.47,2.76,1.74,5.42,3.3,7.95,5.05,2.18,1.51,4.74,1.2,6.31-1.02.97-1.37,1.59-2.95.53-4.43-2-2.78-4.04-5.52-5.2-8.99ZM40.26,49.46v26.82c8.01-8.58,6.75-19.08,0-26.82ZM76.69,40.12c-4.15-3.4-8.37-5.84-13.6-5.62-5.11.22-9.6,2.1-13.68,5.62h27.28ZM3.74,40.09c4.75,3.81,9.53,6.36,15.58,5.44,4.36-.66,8.18-2.41,11.74-5.44H3.74ZM40.23,3.89c-8.26,8.77-6.55,19.65,0,26.83V3.89ZM61.87,61.42c.19-5.76-6.29-12.13-11.07-11.09,3.63,3.64,7.31,7.33,11.07,11.09ZM30.07,50.84c-3.65,3.59-7.37,7.27-11.03,10.88,5.52.22,11.33-5.56,11.03-10.88ZM18.56,18.83c-.24,5.66,6.38,12.16,11.11,11.03-3.66-3.64-7.36-7.31-11.11-11.03ZM50.37,29.35c3.61-3.61,7.31-7.3,10.89-10.87-5.37-.21-11.29,5.73-10.89,10.87ZM33.26,22.23c-.25-1.84-.49-3.65-.76-5.71-2.08,1.02-4.02,1.97-5.97,2.92,1.36,1.59,2.54,2.97,3.69,4.32,1.03-.52,2.04-1.03,3.04-1.53ZM58.13,33.16c1.9-.26,3.69-.5,5.75-.78-1.05-2.1-2.01-4.02-2.96-5.93-1.6,1.36-2.96,2.52-4.31,3.67.5.99,1,2,1.52,3.05ZM30.21,56.46c-1.21,1.41-2.37,2.76-3.69,4.32,1.97.96,3.91,1.91,5.98,2.92.28-2.11.52-3.95.75-5.72-1.07-.53-2.06-1.02-3.04-1.51ZM58.13,47.06c-.51,1.02-1.04,2.08-1.51,3.04,1.45,1.24,2.8,2.39,4.34,3.7.96-1.99,1.9-3.93,2.89-5.99-2.09-.27-3.86-.5-5.72-.74ZM53.93,60.77c-1.38-1.61-2.54-2.97-3.7-4.32-1.02.52-2.06,1.04-3.05,1.54.26,1.88.5,3.68.78,5.71,2.09-1.02,4-1.96,5.96-2.92ZM50.23,23.76c1.23-1.44,2.39-2.8,3.71-4.33-2-.96-3.95-1.9-5.99-2.88-.28,2.07-.52,3.84-.77,5.69.99.5,2.04,1.02,3.04,1.53ZM19.5,26.41c-.98,2.03-1.91,3.95-2.89,5.99,2.06.27,3.87.51,5.71.76.52-1.04,1.04-2.08,1.52-3.04-1.4-1.2-2.76-2.36-4.34-3.7ZM16.57,47.81c1.04,2.11,1.98,4.02,2.94,5.97,1.57-1.34,2.96-2.52,4.33-3.69-.52-1.02-1.05-2.06-1.55-3.03-1.88.25-3.66.48-5.72.75ZM40.29,38.21c-.65.54-1.57,1.3-2.12,1.75.68.76,1.47,1.62,1.92,2.13.67-.68,1.5-1.53,2.02-2.06-.51-.51-1.31-1.31-1.82-1.82Z"/>
                    <path class="cls-1" d="M319.02,43.34h-23.42c0,.48,0,.92,0,1.36,0,4.39.07,8.77-.03,13.16-.05,2.42.95,4.25,2.67,5.8.3.27.64.51.93.81.5.51.35.86-.31,1.02-.16.04-.33.03-.49.03-4.31,0-8.62,0-12.94-.01-.33,0-.65-.21-.98-.32.17-.34.28-.73.52-1,.63-.7,1.36-1.3,1.96-2.02.88-1.07,1.29-2.32,1.28-3.74-.02-11.97-.04-23.94.02-35.91.01-2.29-.89-4.01-2.46-5.52-.27-.26-.6-.44-.83-.72-.22-.26-.34-.6-.5-.9.31-.13.62-.36.93-.36,4.35-.02,8.71-.02,13.06,0,.33,0,.65.2.98.31-.18.33-.28.76-.55.96-2.43,1.88-3.44,4.26-3.3,7.37.18,4.21.05,8.43.05,12.74h23.42v-3.44c0-3.48-.08-6.97.03-10.45.07-2.4-.98-4.15-2.64-5.68-.24-.22-.55-.39-.74-.64-.18-.23-.26-.55-.39-.83.27-.12.54-.33.81-.34,1.4-.04,2.79-.02,4.19-.02,2.96,0,5.91-.01,8.87.01.37,0,.75.2,1.12.31-.18.32-.29.74-.56.95-2.39,1.89-3.36,4.25-3.33,7.36.13,11.39.09,22.79.02,34.19-.01,2.47.95,4.33,2.72,5.89.22.19.48.34.65.56.19.27.3.6.45.9-.29.11-.57.31-.86.33-1.03.04-2.05.02-3.08.02-3.29,0-6.57.01-9.86-.02-.39,0-.78-.26-1.17-.39.2-.33.33-.75.61-.97,2.27-1.76,3.31-3.96,3.21-6.9-.16-4.58-.04-9.17-.04-13.89Z"/>
                    <path class="cls-1" d="M188.93,48.38c-1.09.12-2.06.28-3.03.3-.41,0-.84-.28-1.25-.43.19-.46.24-1.12.58-1.33,1.65-1.03,3.39-1.91,5.06-2.9.55-.32,1.19-.74,1.44-1.28,4.17-9.03,8.3-18.08,12.42-27.13.41-.89.79-1.66,2-1.65,1.21,0,1.57.79,1.97,1.68,4.7,10.35,9.41,20.7,14.11,31.05.57,1.26.85,1.38,2.13.75.62-.31,1.16-.77,1.77-1.09.29-.16.8-.34.97-.21.26.2.48.69.44,1.03-.21,1.63-.81,3.09-2.29,4-.62.38-.7.73-.4,1.37,1.21,2.58,2.26,5.25,3.59,7.77.74,1.41,1.91,2.6,2.87,3.9.2.27.33.6.5.9-.3.15-.6.41-.91.42-3.53.03-7.07.03-10.6,0-.3,0-.61-.27-.91-.42.16-.3.26-.68.5-.89,1.77-1.58,1.78-1.57.8-3.77-.9-2.01-1.77-4.03-2.73-6.01-.16-.34-.68-.78-1-.75-4.74.39-9.11-1.04-13.49-2.58-2.25-.79-4.59-1.33-6.96-2.01-.98,2.16-1.85,4.08-2.71,6-.89,1.97-1.7,3.98-2.69,5.9-.63,1.22-.41,2.03.61,2.84.43.34.68.9,1.02,1.36-.58.12-1.15.34-1.73.35-3.16.03-6.33.03-9.49,0-.42,0-.84-.28-1.26-.43.24-.34.46-.69.72-1.02.73-.93,1.67-1.75,2.17-2.79,1.98-4.07,3.82-8.2,5.7-12.31.05-.11.04-.24.09-.6ZM214.56,46.79c-2.85-6.32-5.61-12.43-8.37-18.54-.12.02-.25.04-.37.07-2.09,4.7-4.19,9.41-6.33,14.22,5.29.36,9.82,3.06,15.07,4.26Z"/>
                    <path class="cls-1" d="M240.39,58.39c0-1.93-.03-3.85.02-5.78.01-.47.31-.93.47-1.39.48.22,1.1.33,1.43.69,2.68,2.87,5.62,5.37,9.34,6.81,3.29,1.27,6.58,1.66,9.81-.14,3.87-2.15,4.62-6.98,1.61-10.22-2.11-2.28-4.85-3.59-7.63-4.81-3.33-1.47-6.69-2.86-9.57-5.16-4.21-3.37-5.8-7.83-4.9-12.97.94-5.39,4.44-8.82,9.65-10.37,4.87-1.44,9.7-.99,14.41.81,2.33.89,2.65.81,4.31-1.08.26-.29.68-.44,1.03-.66.11.37.31.74.31,1.11.02,3.69.03,7.38,0,11.07,0,.4-.25.8-.39,1.19-.43-.18-.96-.25-1.26-.55-2.87-2.88-6.26-4.8-10.17-5.88-2.09-.58-4.15-.48-6.16.21-2.51.86-4.18,2.59-4.59,5.26-.37,2.46.52,4.67,2.49,6.04,2.29,1.6,4.81,2.9,7.35,4.09,3.78,1.78,7.69,3.31,10.74,6.28,6.63,6.47,5.31,16.55-2.82,21.02-6.07,3.34-12.33,2.82-18.58.42-.27-.1-.52-.24-.78-.36-2.69-1.24-2.79-1.21-4.82.95-.22.23-.59.32-.89.48-.14-.34-.4-.69-.41-1.03-.04-2.01-.02-4.02-.02-6.02Z"/>
                    <path class="cls-1" d="M98.15,58.38c0-1.89-.03-3.77.02-5.66.02-.51.3-1.01.46-1.51.51.26,1.14.41,1.51.8,2.5,2.64,5.2,4.98,8.59,6.42,2.68,1.15,5.44,1.81,8.35,1.02,2.69-.73,4.8-2.25,5.41-5.1.63-2.97-.48-5.52-2.96-7.15-2.55-1.67-5.36-2.93-8.03-4.41-2.6-1.43-5.36-2.67-7.74-4.41-4.47-3.25-6.02-7.93-4.96-13.23,1.13-5.7,4.99-9.04,10.54-10.38,4.58-1.11,9.09-.63,13.47,1.08,2.3.9,2.68.79,4.3-1.1.24-.28.61-.46.92-.68.15.38.42.76.42,1.15.03,3.69.03,7.38,0,11.07,0,.4-.26.79-.39,1.19-.42-.18-.95-.24-1.25-.54-2.9-2.9-6.32-4.92-10.3-5.89-3.27-.8-6.41-.44-8.91,2.03-2.75,2.71-2.38,7.24.96,9.65,2.19,1.58,4.75,2.66,7.15,3.96,3.12,1.69,6.4,3.13,9.32,5.11,4.13,2.8,6.07,6.96,5.54,11.95-.62,5.86-4.21,9.54-9.6,11.42-5.81,2.02-11.52,1.25-17.03-1.29-2.22-1.02-2.66-.94-4.31.92-.27.3-.71.44-1.07.65-.14-.39-.38-.77-.39-1.16-.04-1.97-.02-3.93-.02-5.9Z"/>
                    <path class="cls-1" d="M178.65,25.75c-1.01-1.08-1.68-1.92-2.47-2.61-1.17-1.04-2.56-1.53-4.16-1.5-2.87.05-5.74.01-8.8.01v1.47c0,11.6.05,23.2-.04,34.8-.02,2.66,1.12,4.5,3.01,6.11.35.3.59.72,1.1,1.34-.8.07-1.2.14-1.59.14-4.15,0-8.3.02-12.44-.01-.45,0-.89-.25-1.33-.38.27-.37.47-.83.81-1.11,2.13-1.76,3.09-3.92,3.06-6.74-.09-11.35-.04-22.71-.04-34.06,0-.48,0-.96,0-1.54-3.44,0-6.72-.13-9.99.05-1.96.11-3.39,1.5-4.67,2.94-.24.27-.63.42-.94.62-.12-.36-.34-.72-.35-1.08-.03-2.54,0-5.08-.04-7.62-.02-1.17.51-1.61,1.64-1.6,12.03.01,24.06.02,36.1,0,1.15,0,1.68.56,1.69,1.62.02,2.54.03,5.08-.01,7.62,0,.39-.26.78-.54,1.54Z"/>
                    </g>
                </svg>
            `;

            let topHR = document.createElement("HR");

            let textContainer = document.createElement("DIV");
            textContainer.classList.add("text-container");
            let name = document.createElement("H1");
            name.classList.add("name");

            // CHANGE TO TEA NAME -------------------------------------------------------------
            name.innerText = `${datapoint.Flavor_Name}`;

            let textExtra = document.createElement("DIV");
            textExtra.classList.add("text-extra");
            
            let textExtraTeaContainer = document.createElement("DIV");
            textExtraTeaContainer.classList.add("text-extra-tea-container");
            let teaLabel = document.createElement("P");
            teaLabel.classList.add("text-extra-tea");
            teaLabel.classList.add("text-extra-labels");

            // CHANGE TO TEA TYPE -------------------------------------------------------------
            teaLabel.innerText = `${datapoint.Tea_Type}`;

            let bagCount = document.createElement("P");
            bagCount.classList.add("text-extra-labels");
            bagCount.innerText = "18 TEA BAGS";
            let weight = document.createElement("P");
            weight.classList.add("text-extra-labels");
            weight.innerText = "NET WT 1.1 oz (34 g)";
            
            textExtraTeaContainer.appendChild(teaLabel);
            textExtra.appendChild(textExtraTeaContainer);
            textExtra.appendChild(bagCount);
            textExtra.appendChild(weight);
            textContainer.appendChild(name);
            textContainer.appendChild(textExtra);
            
            let bottomHR = document.createElement("HR");

            newText.appendChild(topHR);
            newText.appendChild(textContainer);
            newText.appendChild(bottomHR);

            // CAFFEINE LEVEL -------------------------------------------------------------
            let caffeineContainer = document.createElement("DIV");
            caffeineContainer.classList.add("caffeine-container");

            let caffeineText = document.createElement("P");
            caffeineText.classList.add("caffeine-label");
            caffeineText.innerText = "CAFFEINE LEVEL:";

            let noCaffeineText = document.createElement("P");
            noCaffeineText.classList.add("no-caffeine-label");
            noCaffeineText.innerText = "NO CAFFEINE";

            if(datapoint.Caffeine_Level > 0) {
                noCaffeineText.classList.add("no-show");
            }
            
            let spark1 = document.createElement("DIV");
            spark1.classList.add("spark1");
            spark1.classList.add("spark");
            spark1.innerHTML = `
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.94 85.74">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #2d2a2a;
                        stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-1" points="53.82 0 53.28 23.68 73.94 22.4 58.91 40.89 72.41 56.8 51.69 59.26 50.12 83.03 35.85 68.04 20.12 85.74 20.66 62.07 0 63.34 15.03 44.85 1.53 28.95 22.25 26.48 23.83 2.71 38.09 17.71 53.82 0"/>
                </svg>                
            `;
            let spark2 = document.createElement("DIV");
            spark2.classList.add("spark2");
            spark2.classList.add("spark");
            spark2.innerHTML = `
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.94 85.74">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #2d2a2a;
                        stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-1" points="53.82 0 53.28 23.68 73.94 22.4 58.91 40.89 72.41 56.8 51.69 59.26 50.12 83.03 35.85 68.04 20.12 85.74 20.66 62.07 0 63.34 15.03 44.85 1.53 28.95 22.25 26.48 23.83 2.71 38.09 17.71 53.82 0"/>
                </svg>                
            `;
            let spark3 = document.createElement("DIV");
            spark3.classList.add("spark3");
            spark3.classList.add("spark");
            spark3.innerHTML = `
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.94 85.74">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #2d2a2a;
                        stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-1" points="53.82 0 53.28 23.68 73.94 22.4 58.91 40.89 72.41 56.8 51.69 59.26 50.12 83.03 35.85 68.04 20.12 85.74 20.66 62.07 0 63.34 15.03 44.85 1.53 28.95 22.25 26.48 23.83 2.71 38.09 17.71 53.82 0"/>
                </svg>                
            `;
            let spark4 = document.createElement("DIV");
            spark4.classList.add("spark4");
            spark4.classList.add("spark");
            spark4.innerHTML = `
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.94 85.74">
                    <defs>
                    <style>
                        .cls-1 {
                        fill: #2d2a2a;
                        stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-1" points="53.82 0 53.28 23.68 73.94 22.4 58.91 40.89 72.41 56.8 51.69 59.26 50.12 83.03 35.85 68.04 20.12 85.74 20.66 62.07 0 63.34 15.03 44.85 1.53 28.95 22.25 26.48 23.83 2.71 38.09 17.71 53.82 0"/>
                </svg>                
            `;
            // ADD HIDDEN CLASS TO SPARK ELEMENTS BASED ON CAFFEINE LEVEL -------------------------------------------------------------
            if(datapoint.Caffeine_Level == 0) {
                spark1.classList.add("hidden");
                spark2.classList.add("hidden");
                spark3.classList.add("hidden");
                spark4.classList.add("hidden");
            } else if (datapoint.Caffeine_Level == 1){
                spark2.classList.add("hidden");
                spark3.classList.add("hidden");
                spark4.classList.add("hidden");
            } else if (datapoint.Caffeine_Level == 2){
                spark3.classList.add("hidden");
                spark4.classList.add("hidden");
            } else if (datapoint.Caffeine_Level == 3){
                spark4.classList.add("hidden");
            } else if (datapoint.Caffeine_Level == 4) {
                // do nothing
            }

            newText.appendChild(caffeineText);
            newText.appendChild(noCaffeineText);

            caffeineContainer.appendChild(spark1);
            caffeineContainer.appendChild(spark2);
            caffeineContainer.appendChild(spark3);
            caffeineContainer.appendChild(spark4);
            newText.appendChild(caffeineContainer);

            // put text into package
            newPackage.appendChild(newText);

            let cupContainer = document.createElement("DIV");
            cupContainer.classList.add("cup-container");
            cupContainer.innerHTML = `
                <svg class="cup" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331.2 195.67">
                    <defs>
                      <style>
                        .cls-1 {
                          fill: #2d2a2a;
                          stroke-width: 0px;
                        }
                      </style>
                    </defs>
                    <path class="cls-1" d="M0,0h297.12v64.09c0,72.62-58.96,131.58-131.58,131.58h-33.97C58.96,195.67,0,136.71,0,64.09V0H0Z"/>
                    <path class="cls-1" d="M331.2,7.46c-20.27,10.76-34.08,32.08-34.08,56.63s13.81,45.86,34.08,56.63V7.46Z"/>
                </svg>
            `;

            // put cup into package
            newPackage.appendChild(cupContainer);

            // ingredients
            let ingredientsContainer = document.createElement("DIV");
            ingredientsContainer.classList.add("ingredients-container");
            
            let citrus = document.createElement("DIV");
            citrus.classList.add("citrus");
            citrus.innerHTML = `
            <svg class="citrus" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.3 237.1">
                <defs>
                <style>
                    .cls-2 {
                    fill: #ffffff;
                    stroke-width: 0px;
                    }
                </style>
                </defs>
                <polygon class="cls-2" points="107 1 182.4 62 159.2 75.4 137.2 77.4 115.8 69.2 101.9 47.8 96.2 23.1 107 1"/>
                <polygon class="cls-2" points="72.6 206.3 151.8 176 151.8 199.4 143.6 217 128.1 229.5 105.8 230.7 84.7 224.2 72.6 206.3"/>
                <polygon class="cls-2" points="27.9 55.7 21.7 75.9 29.3 99.1 43.4 113.2 69.1 117.7 82.2 121.2 88.6 116.4 91.4 103.3 94.3 85.1 90.5 66.6 70 48 49 45.2 36.8 40.3 27.4 45.5 27.9 55.7"/>
                <polygon class="cls-2" points="159.1 96.8 138.7 92.3 116.5 101.6 103.7 116.6 101.3 142.2 98.9 155.4 104.2 161.3 117.3 163.1 135.5 164.4 153.4 159.2 170.1 137.5 171.1 116.6 174.9 104.2 169.1 95.4 159.1 96.8"/>
                <path class="cls-2" d="M7.8,147.7l-2.8,21.3,5.6,19.5s21.6,11.9,22.6,12.3,27.8-1.9,27.8-1.9l12.9-17.1,4.6-20.4-6.6-20.6-21.6-9.8-13.5.2-6.4-5-9.8,4.3-.2,5.1-12.8,12h0Z"/>
            </svg>
            `;
            let dessert = document.createElement("DIV");
            dessert.classList.add("dessert");
            dessert.innerHTML = `
                <svg class="dessert" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188.15 236.83">
                    <defs>
                      <style>
                        .cls-2 {
                          fill: #fff;
                          stroke-width: 0px;
                        }
                      </style>
                    </defs>
                    <polygon class="cls-2" points="158.18 83.88 90.17 122.88 116.96 162.7 164.09 152.74 178.99 120.2 158.18 83.88"/>
                    <polygon class="cls-2" points="97.09 170.59 100.63 177.46 109.7 178.01 126.99 172.09 137.8 175.97 139.55 187.28 153.72 196.03 156.87 214.65 142.02 227.56 114.15 236.83 94.63 230.43 83.22 208.97 85.66 189.26 97.09 170.59"/>
                    <path class="cls-2" d="M26.05,135.11l-7.76-12.61-5.59,15.5-12.7,1.14,20.86,14.8-3.33,15.11,8.37,12.33,15.67,4.08-3.11,21.71s13.57-11.96,13.59-10.95c.02,1.01,7.26,13.24,7.26,13.24l5.35-18.88,14.03.21-24.11-14.33.14-.1,1.98-18.51-7.85-10.27-11.93-3.01,3.2-12.63-14.07,3.17Z"/>
                    <path class="cls-2" d="M163.65,67.11l14.73,8.73-2.62-18.87,12.39-8-29.32-3.93-4.71-17.27-15.21-8.12-18.23,4.25L112.19,0s-7.45,19.55-8.02,18.52c-.56-1.02-14.56-9.65-14.56-9.65l4.68,22.21-14.48,7.33,32.39,1.7-.09.18,7.93,20.02,13.56,6.29,13.84-3.33,3.52,14.65,12.7-10.82Z"/>
                    <polygon class="cls-2" points="53.5 51.2 54.83 65.34 39.25 64.13 37.24 79.71 18.51 75.78 17.93 87.78 32.22 111.11 56.23 122.92 86.57 115.49 100.72 95.82 97.45 64.94 72.57 48.25 52.64 46.43 53.5 51.2"/>
                </svg>
            `;
            let fruit = document.createElement("DIV");
            fruit.classList.add("fruit");
            fruit.innerHTML = `
                <svg class="fruit" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.48 237.09">
                    <defs>
                    <style>
                        .cls-2 {
                            fill: #fff;
                            stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-2" points="148.3 178.03 136.63 168.18 119.86 166.98 105.28 177.67 105.23 177.68 105.93 172.64 107.41 165.25 103.44 164.33 102.87 172.35 96.62 166.58 88.06 167.56 82.56 170.14 90.58 176.08 97.48 175.15 102.82 173.03 102.82 173.07 105.21 177.69 89.68 181.99 81 194.42 81.27 216.15 97.78 233.9 122.53 237.09 141.01 228.41 152.71 212.46 155.3 197.36 148.3 178.03"/>
                    <polygon class="cls-2" points="70.09 152.21 57.6 135.75 39.7 127.41 33.46 128.45 34.23 124.86 29.72 127.59 27.47 124.63 26.28 128.78 21.65 127.95 23.03 130.19 18.53 130.94 3.36 146.68 0 169.05 14.91 192.82 39.16 199.4 58.73 192.24 70.1 175.67 70.09 152.21"/>
                    <polygon class="cls-2" points="172.36 107.76 158.88 96.38 148.04 97.9 148.33 97.76 153.8 94.25 153.89 85.91 143 90.42 141.59 97.87 131.15 90.8 118.19 92.7 105 106.24 102.35 124.6 111.25 142.84 126.65 153.06 146.79 158.74 154.97 149.43 168.89 142.24 176.95 123.73 172.36 107.76"/>
                    <polygon class="cls-2" points="40.75 47.68 35.83 55.98 24 66.43 20.46 87.33 28.15 105.78 49.66 118.99 71.18 117.46 90.09 106.08 97 87.95 95.93 63.66 78.71 49.22 63.5 47.53 51.97 43.84 40.75 47.68"/>
                    <path class="cls-2" d="M172.5,21.15l-8.97-4.59-13.24-.86L162.65.16l-6.77-.16-8.53,14.83-10.87-10.28-13.19.82-16.05,13.28-5.77,21.75,2.71,19.71s6.7,11.99,7.74,12.66,13.91,5.86,13.91,5.86l18.22-2.24,15-9.45,12.7-13.09,5.72-20.41-4.98-12.31Z"/>
                </svg>
            `;
            let vegetal = document.createElement("DIV");
            vegetal.classList.add("vegetal");
            vegetal.innerHTML = `
                <svg class="vegetal" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.6 236.3">
                    <defs>
                    <style>
                        .cls-2 {
                            fill: #fff;
                            stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-2" points="168.3 25.7 157.4 13.1 171.1 1.2 166.5 0 155.3 12.8 120.9 15.5 100.8 37.4 99.6 81 153.1 64 166.1 44.2 168.3 25.7"/>
                    <polygon class="cls-2" points="91.8 93 92.5 89.2 87.5 85.4 78.2 81.5 73.2 81.2 80.9 77.4 90.1 66.8 88.4 63.4 82.2 63.1 73.5 65.1 73.9 64.5 76.3 50.7 73 48.6 67.6 51.7 60.3 58.7 58.8 61.8 58.8 55.4 53.4 42.4 49.5 42.4 46.5 47.9 44.2 57.7 44.6 61.8 40.2 57.9 26.9 53.3 24.3 56.2 26.4 62 32.2 70.3 36.5 73.4 29.8 73.4 16.8 78.8 16.8 82.7 22.3 85.6 32.1 88 34.5 87.7 30.2 91.1 23.3 103.3 25.6 106.4 31.8 105.3 41 101.2 43.7 98.5 43.2 106.1 47.7 119.4 51.6 119.6 54.9 114.4 57.9 104.7 57.7 100.3 63.7 108 75.9 115 79 112.6 78 106.5 73.8 97.3 71.9 95.2 78.2 96.3 91.8 93"/>
                    <path class="cls-2" d="M65.5,201.1l5-36.9-17.4-21.8-21.5-13-21-6.9-2.7,30.7s19.8,27.2,21.6,27.3,17.5,6.9,17.5,6.9l18.4,13.7h0Z"/>
                    <polygon class="cls-2" points="172 130.7 177.6 93.2 158.7 95 138.8 99.4 107.7 110.7 79.7 143.4 128.3 157.9 158.2 144.1 172 130.7"/>
                    <polygon class="cls-2" points="149.3 211.7 149.9 208.1 145.3 204.6 136.7 201 132 200.8 139.1 197.2 147.7 187.4 146.1 184.2 140.4 184 132.4 185.8 132.7 185.3 134.9 172.5 131.9 170.6 126.8 173.4 120.1 179.9 118.7 182.8 118.7 176.9 113.7 164.8 110.1 164.8 107.4 169.9 105.2 179 105.6 182.8 101.5 179.2 89.2 174.9 86.8 177.6 88.7 183 94.1 190.7 98 193.5 91.9 193.5 79.8 198.5 79.8 202.1 84.9 204.8 94 207 96.2 206.8 92.2 209.9 85.8 221.2 88 224.1 93.7 223.1 102.2 219.2 104.7 216.8 104.3 223.7 108.4 236.1 112 236.3 115.1 231.4 117.9 222.5 117.7 218.5 123.2 225.6 134.6 232 137.4 229.8 136.4 224.1 132.6 215.6 130.8 213.8 136.6 214.7 149.3 211.7"/>
                </svg>
            `;
            let spices = document.createElement("DIV");
            spices.classList.add("spices");
            spices.innerHTML = `
                <svg class="spices" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 182.06 217.18">
                    <defs>
                    <style>
                        .cls-2 {
                            fill: #fff;
                            stroke-width: 0px;
                        }
                    </style>
                    </defs>
                    <polygon class="cls-2" points="91.87 143 49.29 4.15 38.1 7.39 82.54 146.46 91.87 143"/>
                    <polygon class="cls-2" points="52.17 181.38 44.06 135.35 54.02 102.48 40.31 117.83 39.57 97.78 25.27 88.74 6.87 97.66 4.72 108.42 18.81 127.72 0 129.57 24.27 140.8 30.82 166.04 50.02 192.14 64.78 202.34 63.01 191.8 52.17 181.38"/>
                    <polygon class="cls-2" points="161.23 112.62 182.06 97.21 151.48 97.82 153.49 94.54 153.87 68.63 136.7 92.11 134.67 87.81 113.21 73.28 122.83 98.94 97.57 104.08 121.87 114.82 121.29 115.05 105.33 135.46 133.34 127.1 133.05 129.38 143.44 153.12 149.38 124.48 150.63 125.32 176.5 126.82 159.03 112.84 161.23 112.62"/>
                    <polygon class="cls-2" points="84.09 210.04 98.38 185.48 127.4 165.84 146.65 162.72 157.76 184.14 141.24 205.13 118.02 212.72 97.04 217.18 84.09 210.04"/>
                    <polygon class="cls-2" points="179.24 8.97 161.34 38.24 125.77 61.2 102.44 64.46 89.6 38.29 110.1 13.39 138.34 4.84 163.8 0 179.24 8.97"/>
                </svg>
            `;
            // ADD HIDDEN CLASS TO UNUSED ELEMENTS -------------------------------------------------------------
            if(datapoint.Flavor == "Citrus") {
                dessert.classList.add("no-show");
                fruit.classList.add("no-show");
                vegetal.classList.add("no-show");
                spices.classList.add("no-show");
            } else if(datapoint.Flavor == "Dessert") {
                citrus.classList.add("no-show");
                fruit.classList.add("no-show");
                vegetal.classList.add("no-show");
                spices.classList.add("no-show");
            } else if(datapoint.Flavor == "Fruity") {
                citrus.classList.add("no-show");
                dessert.classList.add("no-show");
                vegetal.classList.add("no-show");
                spices.classList.add("no-show");
            } else if(datapoint.Flavor == "Vegetal") {
                citrus.classList.add("no-show");
                dessert.classList.add("no-show");
                fruit.classList.add("no-show");
                spices.classList.add("no-show");
            } else if(datapoint.Flavor == "Spiced") {
                citrus.classList.add("no-show");
                dessert.classList.add("no-show");
                fruit.classList.add("no-show");
                vegetal.classList.add("no-show");
            } 

            ingredientsContainer.appendChild(citrus);
            ingredientsContainer.appendChild(dessert);
            ingredientsContainer.appendChild(fruit);
            ingredientsContainer.appendChild(vegetal);
            ingredientsContainer.appendChild(spices);
            // put ingredients into package
            newPackage.appendChild(ingredientsContainer);

            // background colors
            let isolate = document.createElement("DIV");
            isolate.classList.add("isolate");
            let noise = document.createElement("DIV");
            noise.classList.add("noise");
            let overlay = document.createElement("DIV");
            overlay.classList.add("overlay");

            // CHANGE HEIGHT OF GRADIENT BASED ON DESIRED ENERGY -------------------------------------------------------------
            // CHANGE GRADIENT COLORS BASED ON FLAVOR/AROMA -------------------------------------------------------------
            
            // noise div
            // on bottom
            let citrusColor = "hsl(57,93%,5%)";
            let vegetalColor = "hsl(96,38%,16%)";
            let spicedColor = "hsl(9,64%,8%)";
            let fruityColor = "hsl(357,96%,77%)";
            let dessertColor = "hsl(292,64%,13%)";

            // overlay div
            // on top
            let sweetColor = "hsl(322,50%,74%)";
            let tangyColor = "hsl(69,90%,55%)";
            let fruityColor2 = "hsl(357,68%,63%)";
            let floralColor = "hsl(345,62%,85%)";
            let herbalColor = "hsl(79,86%,67%)";
            let spicyColor = "hsl(20,82%,51%)";
            let nuttyColor = "hsl(22,18%,65%)";
            let earthyColor = "hsl(3,41%,56%)";

            // very top white gradient
            let whiteColor = "hsl(1,100%,100%)";

            // checking for aromas
            function checkAroma() {
                if(datapoint.Aroma == "Sweet") {
                    overlay.style.backgroundColor = sweetColor;
                } else if (datapoint.Aroma == "Tangy"){
                    overlay.style.backgroundColor = tangyColor;
                } else if (datapoint.Aroma == "Fruity"){
                    overlay.style.backgroundColor = fruityColor2;
                } else if (datapoint.Aroma == "Floral"){
                    overlay.style.backgroundColor = floralColor;
                } else if (datapoint.Aroma == "Herbal"){
                    overlay.style.backgroundColor = herbalColor;
                } else if (datapoint.Aroma == "Spicy"){
                    overlay.style.backgroundColor = spicyColor;
                } else if (datapoint.Aroma == "Nutty"){
                    overlay.style.backgroundColor = nuttyColor;
                } else if (datapoint.Aroma == "Earthy"){
                    overlay.style.backgroundColor = earthyColor;
                } 
            }

            if(datapoint.Desired_Energy == 1) {
                if(datapoint.Flavor == "Citrus"){
                    noise.style.background = `linear-gradient(to top, ${citrusColor} 0%, transparent 30%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Vegetal"){
                    noise.style.background = `linear-gradient(to top, ${vegetalColor} 0%, transparent 30%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Spiced"){
                    noise.style.background = `linear-gradient(to top, ${spicedColor} 0%, transparent 30%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Fruity"){
                    noise.style.background = `linear-gradient(to top, ${fruityColor} 0%, transparent 30%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Dessert"){
                    noise.style.background = `linear-gradient(to top, ${dessertColor} 0%, transparent 30%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } 
            } else if(datapoint.Desired_Energy == 2) {                
                if(datapoint.Flavor == "Citrus"){
                    noise.style.background = `linear-gradient(to top, ${citrusColor} 20%, transparent 60%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Vegetal"){
                    noise.style.background = `linear-gradient(to top, ${vegetalColor} 20%, transparent 60%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Spiced"){
                    noise.style.background = `linear-gradient(to top, ${spicedColor} 20%, transparent 60%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Fruity"){
                    noise.style.background = `linear-gradient(to top, ${fruityColor} 20%, transparent 60%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Dessert"){
                    noise.style.background = `linear-gradient(to top, ${dessertColor} 20%, transparent 60%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } 
            } else if(datapoint.Desired_Energy == 3) {                
                if(datapoint.Flavor == "Citrus"){
                    noise.style.background = `linear-gradient(to top, ${citrusColor} 35%, transparent 80%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Vegetal"){
                    noise.style.background = `linear-gradient(to top, ${vegetalColor} 35%, transparent 80%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Spiced"){
                    noise.style.background = `linear-gradient(to top, ${spicedColor} 35%, transparent 80%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Fruity"){
                    noise.style.background = `linear-gradient(to top, ${fruityColor} 35%, transparent 80%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Dessert"){
                    noise.style.background = `linear-gradient(to top, ${dessertColor} 35%, transparent 80%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } 
            } else if(datapoint.Desired_Energy == 4) {
                if(datapoint.Flavor == "Citrus"){
                    noise.style.background = `linear-gradient(to top, ${citrusColor} 50%, transparent 105%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Vegetal"){
                    noise.style.background = `linear-gradient(to top, ${vegetalColor} 50%, transparent 105%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Spiced"){
                    noise.style.background = `linear-gradient(to top, ${spicedColor} 50%, transparent 105%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Fruity"){
                    noise.style.background = `linear-gradient(to top, ${fruityColor} 50%, transparent 105%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Dessert"){
                    noise.style.background = `linear-gradient(to top, ${dessertColor} 50%, transparent 105%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } 
            } else if(datapoint.Desired_Energy == 5) {
                if(datapoint.Flavor == "Citrus"){
                    noise.style.background = `linear-gradient(to top, ${citrusColor} 75%, transparent 125%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Vegetal"){
                    noise.style.background = `linear-gradient(to top, ${vegetalColor} 75%, transparent 125%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Spiced"){
                    noise.style.background = `linear-gradient(to top, ${spicedColor} 75%, transparent 125%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Fruity"){
                    noise.style.background = `linear-gradient(to top, ${fruityColor} 75%, transparent 125%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } else if(datapoint.Flavor == "Dessert"){
                    noise.style.background = `linear-gradient(to top, ${dessertColor} 75%, transparent 125%), url(https://grainy-gradients.vercel.app/noise.svg)`;
                    checkAroma();
                } 
            } 

            isolate.appendChild(noise);
            isolate.appendChild(overlay);

            // put background elements into package
            newPackage.appendChild(isolate);

            // extra white gradient on top with no mixing
            let isolate2 = document.createElement("DIV");
            isolate2.classList.add("noise-white");
            newPackage.appendChild(isolate2);

            // put the new package inside the data parent
            dataParent.appendChild(newPackage);
        }
    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
});