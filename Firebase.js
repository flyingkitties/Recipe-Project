// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "recipe-corner-ec926.firebaseapp.com",
  projectId: "recipe-corner-ec926",
  storageBucket: "recipe-corner-ec926.appspot.com",
  messagingSenderId: "1071613206428",
  appId: "1:1071613206428:web:ed6d9be6ec16c3c6eeb259",
  measurementId: "G-GQR6PKTBLF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
