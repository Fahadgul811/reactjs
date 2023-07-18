import { initializeApp } from "firebase/app";



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
  
  export default { app };