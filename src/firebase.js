// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhy2mirYDF-02rvMEAWKiri24ntcnKSjI",
  authDomain: "linkedin-clone-77d3b.firebaseapp.com",
  projectId: "linkedin-clone-77d3b",
  storageBucket: "linkedin-clone-77d3b.appspot.com",
  messagingSenderId: "976508205050",
  appId: "1:976508205050:web:5c7d3e41fcfe0cb5f6d643",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
