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

// submits the responses at the end
// mainly for the image storage
function submit() {
    // get the image file from the input element
    const image = document.querySelector('#imageUpload').files[0];
    const treasureName = document.querySelector('#treasureName').value;
    const ownerName = document.querySelector('#ownerName').value;
    const radioOption = document.querySelector('input[name="Q4"]:checked').value;
  
    // handle image upload to FB storage
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(image.name);
  
    imageRef.put(image).then(function(snapshot) {
      imageRef.getDownloadURL().then(function(url) {
        // updates svgs with image url
        const imageElement1 = document.querySelector('#resultImg1');
        const imageElement2 = document.querySelector('#resultImg2');
        const imageElement3 = document.querySelector('#resultImg3');
        const imageElement4 = document.querySelector('#resultImg4');
        const imageElement5 = document.querySelector('#resultImg5');
        imageElement1.setAttribute('xlink:href', url);
        imageElement2.setAttribute('xlink:href', url);
        imageElement3.setAttribute('xlink:href', url);
        imageElement4.setAttribute('xlink:href', url);
        imageElement5.setAttribute('xlink:href', url);

        // check to see which of the frames i need to display
        const imgElContainer1 = document.querySelector('#frame-1-container');
        const imgElContainer2 = document.querySelector('#frame-2-container');
        const imgElContainer3 = document.querySelector('#frame-3-container');
        const imgElContainer4 = document.querySelector('#frame-4-container');
        const imgElContainer5 = document.querySelector('#frame-5-container');

        if(radioOption == 1) {
            imgElContainer1.classList.remove("hidden-section");
        }
        else if(radioOption == 2) {
            imgElContainer2.classList.remove("hidden-section");
        }
        else if(radioOption == 3) {
            imgElContainer3.classList.remove("hidden-section");
        }
        else if(radioOption == 4) {
            imgElContainer4.classList.remove("hidden-section");
        }
        else if(radioOption == 5) {
            imgElContainer5.classList.remove("hidden-section");
        }

        // update the name at the end
        document.querySelector('#resultName').innerHTML = treasureName;
        
        // once the image is uploaded and SVG is updated, store the quiz response in Firebase
        storeResponse(url); 
      }).catch(function(error) {
        console.error('Error getting download URL:', error);
      });
    }).catch(function(error) {
        console.error('Error uploading image:', error);
    });
  }
  
  // passes all info to the realtime database
function storeResponse(imageUrl) {
    // get other input values
    const treasureName = document.querySelector('#treasureName').value;
    const ownerName = document.querySelector('#ownerName').value;
    const radioOption = document.querySelector('input[name="Q4"]:checked').value;
  
    // construct the quiz response object
    const quizResponse = {
        image: imageUrl,
        treasureName: treasureName,
        ownerName: ownerName,
        radioOption: radioOption
    };
  
    // store the quiz response in FB realtime database
    database.ref('quizResponses').push(quizResponse).then(function() {
        console.log('Response stored successfully');
    }).catch(function(error) {
        console.error('Error', error);
    });
}