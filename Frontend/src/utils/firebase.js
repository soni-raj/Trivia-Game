// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeihRoSXJTuJYASWPekpTFlIr_VbAAIxU",
  authDomain: "serverless-391002.firebaseapp.com",
  projectId: "serverless-391002",
  storageBucket: "serverless-391002.appspot.com",
  messagingSenderId: "552682650644",
  appId: "1:552682650644:web:b11ec101b43494da7ffb01",
  measurementId: "G-4XBCCSD40H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
