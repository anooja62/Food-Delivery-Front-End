import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC1COvPxTUeMC9YMn7XWP9A8zkwfc3EtYw",
  authDomain: "deliorder-1.firebaseapp.com",
  projectId: "deliorder-1",
  storageBucket: "deliorder-1.appspot.com",
  messagingSenderId: "505005634779",
  appId: "1:505005634779:web:bffd0e3baf498a127888fe",
  measurementId: "G-XW5ZBG42YP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();




export { auth, provider };