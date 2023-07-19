// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBGLVIFr8_wVB4hALand-vH9sEghg1sfI",
  authDomain: "notes-43036.firebaseapp.com",
  projectId: "notes-43036",
  storageBucket: "notes-43036.appspot.com",
  messagingSenderId: "488495718177",
  appId: "1:488495718177:web:7ab985c18ce23af6e02860",
  measurementId: "G-9S20844KYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  
  export default { app };