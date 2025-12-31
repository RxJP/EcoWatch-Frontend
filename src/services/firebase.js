import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdy1TTB2tAH2X0S_atakOLqttNCb47KvA",
  authDomain: "ecowatch-42175.firebaseapp.com",
  projectId: "ecowatch-42175",
  storageBucket: "ecowatch-42175.firebasestorage.app",
  messagingSenderId: "206406446484",
  appId: "1:206406446484:web:3a9a48d58c96eca1f27381",
  measurementId: "G-NVX8G1FVV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
