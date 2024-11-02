// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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
const auth = getAuth(firebase);
const storage = getStorage(firebase);

// Set the persistence to local storage (default, but good to be explicit)
setPersistence(auth, browserLocalPersistence);

// Conditionally initialize Analytics (for web environments only)
let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(firebase);
  }
});

export { firebase, analytics, db, auth, storage };
