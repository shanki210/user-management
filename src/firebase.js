import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYobTtU4TF1o5Mw9OCHFy5zakmL2AyIlg",
    authDomain: "user-management-fafef.firebaseapp.com",
    projectId: "user-management-fafef",
    storageBucket: "user-management-fafef.appspot.com",
    messagingSenderId: "909953360897",
    appId: "1:909953360897:web:ccdc6d0061e744184c8c00",
    measurementId: "G-8LX4T0KKYW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;