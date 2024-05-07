const firebaseConfig = {
    apiKey: "AIzaSyCqvDXvCZBmW2vNCqKRhYrvZBxNalPSm7U",
    authDomain: "treasures-from-today.firebaseapp.com",
    projectId: "treasures-from-today",
    storageBucket: "treasures-from-today.appspot.com",
    messagingSenderId: "428843830992",
    appId: "1:428843830992:web:2ea00f9bf3fc26d8d318d5",
    measurementId: "G-6FRT41JEMJ"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let userData = [];

firebase.database().ref("quizResponses").once("value").then(function(snapshot) {
    // get all the data and put it in an array
    snapshot.forEach(function(childSnapshot) {
        let response = childSnapshot.val();
        userData.push(response);
    });

    console.log(userData); 

    displayResponses(userData);
});

// display the responses
function displayResponses(responses) {
    let index = 0;
    let subName = document.querySelector("#sub-name");
    let ownerName = document.querySelector("#owner-name");

    // svgs with image response.image
    const imageElement1 = document.querySelector('#resultImg1');
    const imageElement2 = document.querySelector('#resultImg2');
    const imageElement3 = document.querySelector('#resultImg3');
    const imageElement4 = document.querySelector('#resultImg4');
    const imageElement5 = document.querySelector('#resultImg5');

    function displayNextResponse() {
        let response = responses[index];

        $("#sub-name").fadeOut();
        $("#owner-name").fadeOut();

        // update based on radio option
        for (let i = 1; i <= 5; i++) {
            imageElement1.setAttribute('xlink:href', response.image);
            imageElement2.setAttribute('xlink:href', response.image);
            imageElement3.setAttribute('xlink:href', response.image);
            imageElement4.setAttribute('xlink:href', response.image);
            imageElement5.setAttribute('xlink:href', response.image);
            if (response.radioOption == i) {
                $("#frame-" + i + "-container").fadeIn();
            } else {
                $("#frame-" + i + "-container").fadeOut();
            }
        }

        subName.innerHTML = response.treasureName;
        ownerName.innerHTML = response.ownerName;

        $("#sub-name").fadeIn();
        $("#owner-name").fadeIn();

        // function to loop
        index = (index + 1) % responses.length;

        // fading time
        setTimeout(displayNextResponse, 5000);
    }

    // loop the function
    displayNextResponse();
}