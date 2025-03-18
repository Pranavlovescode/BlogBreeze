import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBETxWut2oO2PWY06Y1RcTJ-fUbFL7YC2I",
    authDomain: "blogbreeze-ffa79.firebaseapp.com",
    projectId: "blogbreeze-ffa79",
    storageBucket: "blogbreeze-ffa79.appspot.com",
    messagingSenderId: "323933269998",
    appId: "1:323933269998:web:47e38a105b307f08ba68ff",
    measurementId: "G-YBD4G57JB8"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { auth, db };