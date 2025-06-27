// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDAd7TEnAlnaPxSYXQbmwsPwiJzJ6iP_9c",
  authDomain: "wallet-hunter-family-hub.firebaseapp.com",
  projectId: "wallet-hunter-family-hub",
  storageBucket: "wallet-hunter-family-hub.firebasestorage.app",
  messagingSenderId: "199771652631",
  appId: "1:199771652631:web:e92fd9c9b3a249255d1252",
  measurementId: "G-CFMH8BJDSX"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Recaptcha
export { RecaptchaVerifier };
