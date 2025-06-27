// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAd7TEnAlnaPxSYXQbmwsPwiJzJ6iP_9c",
  authDomain: "wallet-hunter-family-hub.firebaseapp.com",
  projectId: "wallet-hunter-family-hub",
  storageBucket: "wallet-hunter-family-hub.appspot.com",
  messagingSenderId: "199771652631",
  appId: "1:199771652631:web:e92fd9c9b3a249255d1252",
  measurementId: "G-CFMH8BJDSX"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Firebase Analytics (Optional)
export const analytics = getAnalytics(app);

// ✅ Export Firebase Services
export const auth = getAuth(app);                // for OTP
export const db = getFirestore(app);             // for saving data
export { RecaptchaVerifier };                    // for OTP recaptcha
