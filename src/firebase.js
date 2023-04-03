import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyALF3thtE_t6SOC61LMDh1OKY5oAR0iNYo",
    authDomain: "crypto-app-4c031.firebaseapp.com",
    projectId: "crypto-app-4c031",
    storageBucket: "crypto-app-4c031.appspot.com",
    messagingSenderId: "1014741127708",
    appId: "1:1014741127708:web:9bd033f5a2d772a871c5d9",
    measurementId: "G-S89YPMXQS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);


