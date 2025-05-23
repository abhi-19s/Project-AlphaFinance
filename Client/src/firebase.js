// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-447d6.firebaseapp.com",
  projectId: "mern-estate-447d6",
  storageBucket: "mern-estate-447d6.firebasestorage.app",
  messagingSenderId: "252249991340",
  appId: "1:252249991340:web:06e0582a9c47552e0d9709"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("Firebase App: ", app);
