// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZw3GH0gWnVFbBzyzvZAQIjk_uR_SbmPg",
  authDomain: "aitutor-2e5df.firebaseapp.com",
  projectId: "aitutor-2e5df",
  storageBucket: "aitutor-2e5df.appspot.com",
  messagingSenderId: "206470666845",
  appId: "1:206470666845:web:c496e244cf4fd0deff8bb4",
  measurementId: "G-XZCPD87L92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);