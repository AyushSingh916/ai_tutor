import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZw3GH0gWnVFbBzyzvZAQIjk_uR_SbmPg",
  authDomain: "aitutor-2e5df.firebaseapp.com",
  projectId: "aitutor-2e5df",
  storageBucket: "aitutor-2e5df.appspot.com",
  messagingSenderId: "206470666845",
  appId: "1:206470666845:web:c496e244cf4fd0deff8bb4",
  measurementId: "G-XZCPD87L92",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);