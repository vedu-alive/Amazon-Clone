import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA_HsEDndxymhfNsA-v9YT1NWGrimoOTg",
  authDomain: "clone-adac4.firebaseapp.com",
  projectId: "clone-adac4",
  storageBucket: "clone-adac4.appspot.com",
  messagingSenderId: "512946258255",
  appId: "1:512946258255:web:ff82a071025d7d8814453a",
  measurementId: "G-YZB2JRDXTX",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  collection,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
};
