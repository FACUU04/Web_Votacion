import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiWaMM8NoMl41fbZhZeEkKs454j6YqnpI",
  authDomain: "fiesta-1980.firebaseapp.com",
  projectId: "fiesta-1980",
  storageBucket: "fiesta-1980.firebasestorage.app",
  messagingSenderId: "429556531559",
  appId: "1:429556531559:web:948ff1a7224f5a96cf2fc2",
  measurementId: "G-4EWFR7HHY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);