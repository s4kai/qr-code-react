import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Mch0NWmEtLtiAg-KMKCCwyM6nyGw9Yw",
  authDomain: "cadastro-70468.firebaseapp.com",
  projectId: "cadastro-70468",
  storageBucket: "cadastro-70468.firebasestorage.app",
  messagingSenderId: "790010422258",
  appId: "1:790010422258:web:b5ea3f1cf4f34695a6c16b",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);
export const auth = getAuth(firebase_app);

export default firebase_app;
