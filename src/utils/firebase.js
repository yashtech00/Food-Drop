// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhj6ZwwYG2SiawZduYAMjDHCCVp-6YO0w",
  authDomain: "food-drop-6d887.firebaseapp.com",
  projectId: "food-drop-6d887",
  storageBucket: "food-drop-6d887.appspot.com",
  messagingSenderId: "504354324524",
  appId: "1:504354324524:web:ec04249b5011f5b80ad189",
  measurementId: "G-LEJGVV4THF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export
    const auth = getAuth();