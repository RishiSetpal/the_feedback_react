import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBMaWf2cc7Q8ludeGuIFR9dGM4jPVk2v58",
  authDomain: "the-feedback.firebaseapp.com",
  databaseURL: "https://the-feedback-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-feedback",
  storageBucket: "the-feedback.appspot.com",
  messagingSenderId: "300275211571",
  appId: "1:300275211571:web:5b1f0784d8dfcea40ab246"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);