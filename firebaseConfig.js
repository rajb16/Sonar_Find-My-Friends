// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtrQM7qfvox4xq_hbykx19w7shPxl_alg",
  authDomain: "find-my-friend-e9f17.firebaseapp.com",
  databaseURL: "https://find-my-friend-e9f17-default-rtdb.firebaseio.com",
  projectId: "find-my-friend-e9f17",
  storageBucket: "find-my-friend-e9f17.appspot.com",
  messagingSenderId: "352910718189",
  appId: "1:352910718189:web:02098fa7acea57818588e4",
  measurementId: "G-G4M3XMSC7D",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const storage = getStorage(FIREBASE_APP);