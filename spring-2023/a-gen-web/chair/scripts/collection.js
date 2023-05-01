const firebaseConfig = {
  apiKey: "AIzaSyB6a-RqoaYVn6rZjL3EGtoK0YVP78IWBXc",
  authDomain: "uncomfortable-chair.firebaseapp.com",
  projectId: "uncomfortable-chair",
  storageBucket: "uncomfortable-chair.appspot.com",
  messagingSenderId: "878169192894",
  appId: "1:878169192894:web:58d0f77359ea0a87d521ef",
  measurementId: "G-RLTQYQSCRW"
};
firebase.initializeApp(firebaseConfig);

// refs the firebase storage
var storage = firebase.storage();

// refs the image folder in storage
var imagesRef = storage.ref().child('images');
var storageRef = firebase.storage().ref();

// the parent container to put the images in
let collectionDiv = document.querySelector("#images");

let images = [];

storageRef.listAll().then(function(result) {
  // loop through each image
  result.items.forEach(function(imageRef) {
    let fileName = imageRef.name;
    let timestamp = fileName.split('_')[0];
    images.push({
      ref: imageRef,
      timestamp: timestamp
    });
    // sorts the images based on timestamp
    images.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    });
  });

  // retrieve all download URLs
  const promises = images.map((image) => {
    return image.ref.getDownloadURL();
  });
  Promise.all(promises).then((urls) => {
    // create img and div elements for each image
    urls.forEach((url, i) => {
      const img = document.createElement('img');
      img.classList.add('chair-images');
      img.classList.add(i);
      img.setAttribute("id", "image" + [i]);
      img.src = url;
      
      const div = document.createElement('div');
      div.classList.add('image-container');
      div.classList.add(i);
      div.appendChild(img);
      
      // add div to the collection grid
      collectionDiv.appendChild(div);
    });
  });
}).catch(function(error) {
  console.log(error);
});