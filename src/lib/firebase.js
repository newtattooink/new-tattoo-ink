// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk4J6aD9Eq7_pnmIvs6Y3-BZYbiJFFeK0",
  authDomain: "new-tattoo-site.firebaseapp.com",
  projectId: "new-tattoo-site",
  storageBucket: "new-tattoo-site.firebasestorage.app", // ✅ corrigido
  messagingSenderId: "196847951661",
  appId: "1:196847951661:web:ecac4c89bc6087094ebda4"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
