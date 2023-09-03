// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCtqTra16DkPaVtVP8fHL81uPZPzCVP0dY",
	authDomain: "help-55040.firebaseapp.com",
	databaseURL: "https://help-55040-default-rtdb.firebaseio.com",
	projectId: "help-55040",
	storageBucket: "help-55040.appspot.com",
	messagingSenderId: "22031700599",
	appId: "1:22031700599:web:60e5489b9fbd9a189fec72",
	measurementId: "G-QW2CMN3HEC"
};// Initialize Firebase
let firebase_app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);
export const database = getDatabase(firebase_app);

export default firebase_app;

