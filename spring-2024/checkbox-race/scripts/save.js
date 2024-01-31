const firebaseConfig = {
    apiKey: "AIzaSyBApiM0FeyuYoa0RS85KIM4Sqj3AXLfk24",
    authDomain: "checkmark-race.firebaseapp.com",
    databaseURL: "https://checkmark-race-default-rtdb.firebaseio.com",
    projectId: "checkmark-race",
    storageBucket: "checkmark-race.appspot.com",
    messagingSenderId: "280327519024",
    appId: "1:280327519024:web:41a9513737bc1805f2a6f5",
    measurementId: "G-FNW3B4ML5L"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// save the data to firebase
function saveData() {
    // give submission a specific ID so we can ref which name to pull
    let id = Date.now();

    // get the time
    let time = document.querySelector("#timer").innerHTML;
    time = time.substring(7);

    // get the name input value
    let nameInput = document.querySelector('#name-field').value;

    database.ref('userData/' + id).set({
        time: time,
        name: nameInput
    });
}

let dataArray;

// get all data from firebase and update the scoreboard
function updateScoreboard() {
    // where it's looking in the tree
    const myRef = database.ref('userData/');

    myRef.once('value').then((snapshot) => {
        const data = snapshot.val();

        // return the data from firebase (being brought back as objects) into an array
        // Object.entries brings back the key pairings from the objects
        // .map makes the new array from those entries
        dataArray = Object.entries(data).map(([key, value]) => {
            // return the values/keys from the objects into the array
            return { 
                ...value, 
                id: key
            };
        });

        // sort the data by the key "time", from least to greatest
        dataArray.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        // update the scoreboard
        
        let scoreboard = document.querySelector("#scoreboard-list");

        // clear the scoreboard and make room for new items
        scoreboard.innerHTML = "";

        let count = 1;
        dataArray.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = `${count}. ${item.name} ${item.time}`;
            scoreboard.appendChild(li);
            count++;
        });
    });
}

// update scoreboard on refresh
updateScoreboard();

// see other people add to the scoreboard every 5 sec
setInterval(function() {
    updateScoreboard();
}, 5000);
