// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvlz2cx-RU8zda6xQj5O5KgNWXD5RUEhY",
  authDomain: "note-d954b.firebaseapp.com",
  projectId: "note-d954b",
  storageBucket: "note-d954b.appspot.com",
  messagingSenderId: "242369110960",
  appId: "1:242369110960:web:bf3d09e824e14fd4efec75",
  measurementId: "G-PZNFZ43R93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {app};