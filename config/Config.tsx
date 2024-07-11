// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHhAV4KFyfx6kdWoOxKh3b--fuWNcHkdE",
  authDomain: "fs-prueba-a5609.firebaseapp.com",
  databaseURL: "https://fs-prueba-a5609-default-rtdb.firebaseio.com",
  projectId: "fs-prueba-a5609",
  storageBucket: "fs-prueba-a5609.appspot.com",
  messagingSenderId: "717404136978",
  appId: "1:717404136978:web:8809130b46117a5ae5dacb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);