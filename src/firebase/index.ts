import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7ImZvtxOwhyQhdOVhfxY3PSgqocjUUyE",
  authDomain: "atosh-movie-app-6da58.firebaseapp.com",
  projectId: "atosh-movie-app-6da58",
  storageBucket: "atosh-movie-app-6da58.appspot.com",
  messagingSenderId: "180006825389",
  appId: "1:180006825389:web:c6581695c9ece7682a0524",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
