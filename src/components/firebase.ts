// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkDC-0yh-ho9bEaze7xEQFxDWRXPEP5ic",
  authDomain: "gpttuie.firebaseapp.com",
  projectId: "gpttuie",
  storageBucket: "gpttuie.appspot.com",
  messagingSenderId: "104142120785",
  appId: "1:104142120785:web:d16a67a61cf09ac674d570",
  measurementId: "G-FG8CR9B67K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
