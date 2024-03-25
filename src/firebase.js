// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXLc2yj9TJWceh04GCFl7giTIWcgvHbj4",
  authDomain: "pro-tracker-a2a17.firebaseapp.com",
  projectId: "pro-tracker-a2a17",
  storageBucket: "pro-tracker-a2a17.appspot.com",
  messagingSenderId: "3580178730",
  appId: "1:3580178730:web:674227f989c496b079ee53",
  measurementId: "G-LXPSTNFJEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);