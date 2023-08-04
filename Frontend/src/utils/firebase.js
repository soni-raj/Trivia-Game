// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig1 = {
  apiKey: "AIzaSyAeihRoSXJTuJYASWPekpTFlIr_VbAAIxU",
  authDomain: "serverless-391002.firebaseapp.com",
  projectId: "serverless-391002",
  storageBucket: "serverless-391002.appspot.com",
  messagingSenderId: "552682650644",
  appId: "1:552682650644:web:b11ec101b43494da7ffb01",
  measurementId: "G-4XBCCSD40H",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyBSPO5yrQ8y9h3wqFgZaLrm7o2DiDVLPdQ",
  authDomain: "big-depth-391317.firebaseapp.com",
  databaseURL: "https://big-depth-391317-default-rtdb.firebaseio.com",
  projectId: "big-depth-391317",
  storageBucket: "big-depth-391317.appspot.com",
  messagingSenderId: "945637813834",
  appId: "1:945637813834:web:9a4a6016c2364b2ca3c0b3"
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig1);
export const app2 = initializeApp(firebaseConfig2, "app2");

export const auth = getAuth(app1);
export const db = getFirestore(app2);
