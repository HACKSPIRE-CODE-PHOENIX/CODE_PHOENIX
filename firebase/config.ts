// app/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optional: only import analytics if you really need it (client-side only)
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBfrXtorGoVYNnFEC62lBDZUbC5NUzLYKg",
  authDomain: "hackspire-code-phoenix.firebaseapp.com",
  projectId: "hackspire-code-phoenix",
  storageBucket: "hackspire-code-phoenix.firebasestorage.app",
  messagingSenderId: "567152290521",
  appId: "1:567152290521:web:45a6ba55eacb1876aa6cc8",
  measurementId: "G-3ZRPX4GL61"
};

// Prevent re-initialisation during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore
export const db = getFirestore(app);

// Optional: Analytics (browser-only)
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) getAnalytics(app);
  });
}
