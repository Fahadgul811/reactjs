// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1rl8g-zqMwf9uQFb_dXZx3hIEH8ZmIMM",
  authDomain: "notesapp-c17e4.firebaseapp.com",
  projectId: "notesapp-c17e4",
  storageBucket: "notesapp-c17e4.appspot.com",
  messagingSenderId: "142198661126",
  appId: "1:142198661126:web:95e049c0f7097383da6387",
  measurementId: "G-Y8LBBMNGG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);
//  const database = firestore();

const db = getFirestore();

const auth = getAuth();
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });
    return true;
  } catch (error) {
    return { error: error.message };
  }
};
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return true;
  } catch (error) {
    return { error: error.message };
  }
};

export default { app, database: db };
