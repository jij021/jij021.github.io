// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'

// // to store the imgs produced by the site
// var chairImgs = [];

// const firebaseConfig = {
//     apiKey: "AIzaSyB6a-RqoaYVn6rZjL3EGtoK0YVP78IWBXc",
//     authDomain: "uncomfortable-chair.firebaseapp.com",
//     projectId: "uncomfortable-chair",
//     storageBucket: "uncomfortable-chair.appspot.com",
//     messagingSenderId: "878169192894",
//     appId: "1:878169192894:web:58d0f77359ea0a87d521ef",
//     measurementId: "G-RLTQYQSCRW"
// };

// // Initialize Firebase
// let app = initializeApp(firebaseConfig);
// let db = getFirestore(app);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getStorage, ref as sRef } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyB6a-RqoaYVn6rZjL3EGtoK0YVP78IWBXc",
  authDomain: "uncomfortable-chair.firebaseapp.com",
  projectId: "uncomfortable-chair",
  storageBucket: "uncomfortable-chair.appspot.com",
  messagingSenderId: "878169192894",
  appId: "1:878169192894:web:58d0f77359ea0a87d521ef",
  measurementId: "G-RLTQYQSCRW"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);

const imagesRef = ref(storage, 'images');
const sparkyRef = ref(storage, 'images/sparky.jpg');

uploadBytes(sparkyRef, file).then((snapshot) => {
    console.log(uploadBytes);
})

uploadBytes();

function saveImg() {
    var ref = app.ref('images');

    var result = ref.push(chairImgs, dataSent);
    console.log(result.key);

    function dataSent(status) {
        console.log(status);
    }
}