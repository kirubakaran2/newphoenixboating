import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBhfTqykMUlZP4PcFDtfv9OjXbA6wW2isA",
  authDomain: "newphoenixboating.firebaseapp.com",
  projectId: "newphoenixboating",
  storageBucket: "newphoenixboating.firebasestorage.app",
  messagingSenderId: "810741899734",
  appId: "1:810741899734:web:9cec55f1c93bec76280477",
  measurementId: "G-5SL9QYPL0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);