import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQyoQeutKUBaSzwFpZnR5fJ4j6jNAId3E",
  authDomain: "auth-236ca.firebaseapp.com",
  databaseURL: "https://auth-236ca-default-rtdb.firebaseio.com",
  projectId: "auth-236ca",
  storageBucket: "auth-236ca.firebasestorage.app",
  messagingSenderId: "398381065004",
  appId: "1:398381065004:web:a9fd6b84bc5b1332aa4289",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
