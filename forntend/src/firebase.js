// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-listing-site-c78eb.firebaseapp.com",
  projectId: "car-listing-site-c78eb",
  storageBucket: "car-listing-site-c78eb.firebasestorage.app",
  messagingSenderId: "973037433602",
  appId: "1:973037433602:web:aa0c803e699c87943f481b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);