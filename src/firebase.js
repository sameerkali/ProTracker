import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXLc2yj9TJWceh04GCFl7giTIWcgvHbj4",
  authDomain: "pro-tracker-a2a17.firebaseapp.com",
  projectId: "pro-tracker-a2a17",
  storageBucket: "pro-tracker-a2a17.appspot.com",
  messagingSenderId: "3580178730",
  appId: "1:3580178730:web:674227f989c496b079ee53",
  measurementId: "G-LXPSTNFJEF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;