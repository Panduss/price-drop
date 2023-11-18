// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAXXARmPA8bYyw8K3SBAurHjqkfwL1P1CY",
    authDomain: "price-drop-pct-gear.firebaseapp.com",
    projectId: "price-drop-pct-gear",
    storageBucket: "price-drop-pct-gear.appspot.com",
    messagingSenderId: "734768275574",
    appId: "1:734768275574:web:cbdb16344ac70649f9bf57",
    measurementId: "G-WW2DEQ984Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
export const db = getFirestore(app);

