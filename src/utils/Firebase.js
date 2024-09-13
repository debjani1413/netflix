// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKO7sikToSic2eUCW2SwTEbl454mpmwJM",
  authDomain: "netflix-gpt-7a960.firebaseapp.com",
  projectId: "netflix-gpt-7a960",
  storageBucket: "netflix-gpt-7a960.appspot.com",
  messagingSenderId: "516374154481",
  appId: "1:516374154481:web:0a10842702915a177cad50",
  measurementId: "G-Q8G4VNH9TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();