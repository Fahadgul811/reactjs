// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9APu3QmtjZs7vHgfhzVRh4n5IuODB2j4",
  authDomain: "notes1-326b2.firebaseapp.com",
  projectId: "notes1-326b2",
  storageBucket: "notes1-326b2.appspot.com",
  messagingSenderId: "387296715994",
  appId: "1:387296715994:web:2410b85b8dae138e37b1e3",
  measurementId: "G-6GQDJSTEJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {app};