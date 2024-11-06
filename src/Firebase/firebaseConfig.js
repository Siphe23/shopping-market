// src/Firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Ensure getAuth is imported here
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBVrvQu1Hq6Zi_4o_9hOUGEZenC8-FG8ow",
    authDomain: "base-apparel-8e990.firebaseapp.com",
    projectId: "base-apparel-8e990",
    storageBucket: "base-apparel-8e990.firebasestorage.app",
    messagingSenderId: "585185819949",
    appId: "1:585185819949:web:d48a9a1ee2ebc173e067a4",
    measurementId: "G-D2X9L4GTBR"
};

const app = initializeApp(firebaseConfig);

// Ensure that the 'auth' and 'db' objects are exported
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
