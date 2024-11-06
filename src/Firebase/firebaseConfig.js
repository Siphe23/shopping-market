// src/Firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';

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

// Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Create a custom hook to use the authentication state
export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return { user };
}

export { auth, db };  // Export auth and db
