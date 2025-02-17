import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVIz2ZtoZiukBcseJIo-51WGOiewnW5R8",
    authDomain: "project-54da4.firebaseapp.com",
    projectId: "project-54da4",
    storageBucket: "project-54da4.firebasestorage.app",
    messagingSenderId: "1056795314500",
    appId: "1:1056795314500:web:9b7ba9fbd25e66db6bef11",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
