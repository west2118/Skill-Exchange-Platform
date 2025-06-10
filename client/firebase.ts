import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQyoQeutKUBaSzwFpZnR5fJ4j6jNAId3E",
  authDomain: "auth-236ca.firebaseapp.com",
  projectId: "auth-236ca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
