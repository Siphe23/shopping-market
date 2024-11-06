// src/Frontend/pages/LoginSignup.js
import React, { useState } from 'react';
import { auth } from '../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(true); 

   

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isSignup) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
           
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                role: 'buyer' 
            });
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
       
    } catch (error) {
        console.error("Error during authentication", error);
    }
};


    return (
        <form onSubmit={handleSubmit}>
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            <button type="button" onClick={() => setIsSignup(!isSignup)}>
                Switch to {isSignup ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
};

export default LoginSignup;
