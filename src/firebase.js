// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
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
