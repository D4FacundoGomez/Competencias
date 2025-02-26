// client/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithCustomToken } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ1v_YNLtGFSZ9BlUsYfvbD8hp7_7NwqY",
  authDomain: "brilliant-tracker.firebaseapp.com",
  databaseURL: "https://brilliant-tracker-default-rtdb.firebaseio.com",
  projectId: "brilliant-tracker",
  storageBucket: "brilliant-tracker.firebasestorage.app",
  messagingSenderId: "245439820943",
  appId: "1:245439820943:web:31576eb473c7b49d9aecfa",
  measurementId: "G-PDWD5NJTJP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export async function authenticateWithFirebase(accessToken) {
  const authResult = await signInWithCustomToken(auth, accessToken);
  const user = authResult.user;

  if (!user) {
    throw new Error("Falló la autenticación");
  }
  console.log("Usuario autenticado:", user.displayName);
  return user;
}