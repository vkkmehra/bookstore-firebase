// import * as firebase from 'firebase/app';
import firebase from 'firebase';
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyD7hi8pzAFee5zMzNZFmqL1Vpxo11VxUiU",
    authDomain: "bookstore-firebase-8a1dd.firebaseapp.com",
    databaseURL: "https://bookstore-firebase-8a1dd-default-rtdb.firebaseio.com",
    projectId: "bookstore-firebase-8a1dd",
    storageBucket: "bookstore-firebase-8a1dd.appspot.com",
    messagingSenderId: "47615196772",
    appId: "1:47615196772:web:7c77d8b1bf1b900b9f2971"
  };
  // Initialize Firebase
  console.log(firebase.appId)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

  export default firebase;
//   export default firebase.storage();