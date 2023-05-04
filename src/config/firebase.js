// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD2qMb9eoErGkUXMNM9qL_Lh187vLSPAcw",
  authDomain: "fir-react-ee592.firebaseapp.com",
  projectId: "fir-react-ee592",
  storageBucket: "fir-react-ee592.appspot.com",
  messagingSenderId: "300512015748",
  appId: "1:300512015748:web:937964af1b813733dbd9d1",
  measurementId: "G-VVHBHENG9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)