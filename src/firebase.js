import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyDkJ3lDhXRyOBHlIMqPg5TZRiJ9sNcUVMA",
  authDomain: "food-delivery-56a8e.firebaseapp.com",
  projectId: "food-delivery-56a8e",
  storageBucket: "food-delivery-56a8e.appspot.com",
  messagingSenderId: "321624561526",
  appId: "1:321624561526:web:1eb83b6fe1780ec0ad8c57",
  measurementId: "G-73DG883SP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const db = initializeFirestore(app);
 const db = getFirestore(app);

export { app, analytics, auth,db };