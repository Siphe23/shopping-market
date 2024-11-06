// src/Firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Custom hook to manage authentication state
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
