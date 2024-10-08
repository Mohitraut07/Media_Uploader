// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFWP_yKFL7acakjewju6Ri_9JqaRpg7LE",
  authDomain: "mediauploader-fa0b7.firebaseapp.com",
  projectId: "mediauploader-fa0b7",
  storageBucket: "mediauploader-fa0b7.appspot.com",
  messagingSenderId: "323701658787",
  appId: "1:323701658787:web:d691ce97b2eb74c5bb9b16",
  measurementId: "G-45LNJLEWYV",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const analytics = getAnalytics(firebase);

export { firebase, analytics, db };
