import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXoXGXAc7kxUr-Qh8S-NU-vQVoJAmWapw",
  authDomain: "takenote-app-281c4.firebaseapp.com",
  projectId: "takenote-app-281c4",
  storageBucket: "takenote-app-281c4.appspot.com",
  messagingSenderId: "590311108266",
  appId: "1:590311108266:web:ea443cdf91dfee0756aad3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// authenticate users using the Firebase Auth service
const auth = firebase.auth();

// interact with the Firestore database
const db = firebase.firestore();

// creates a reference to the "users" collection in the Firestore database
// perform operations such as reading, writing, updating or deleting data in the "users" collection of the Firestore database
const usersCollection = db.collection('users');

const labelsCollection = db.collection('labels');

const notesCollection = db.collection('notes');

export {
  auth,
  db,
  usersCollection,
  labelsCollection,
  notesCollection
};