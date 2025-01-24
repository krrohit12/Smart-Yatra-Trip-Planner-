// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyASb8iWEG93HQAqp5HuYjcPr_rVSUyD5Yw",
  authDomain: "tripplanner-cfc76.firebaseapp.com",
  projectId: "tripplanner-cfc76",
  storageBucket: "tripplanner-cfc76.firebasestorage.app",
  messagingSenderId: "1012389383806",
  appId: "1:1012389383806:web:47111deef3cd678f55122f",
  measurementId: "G-F6P0J0L30Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);