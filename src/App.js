import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShopList from "./pages/ShopList"
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Buy from './pages/Buy'; 
import Sell from './pages/Sell'; 
import { auth, db } from './Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import store from '../Redux/store';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderRedirect = async () => {
        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userRole = userDoc.data()?.role;

            if (userRole === 'seller') {
                return <Navigate to="/sell" />; // Redirect to sell page for sellers
            } else {
                return <Navigate to="/buy" />; // Redirect to buy page for buyers
            }
        }
        return <Navigate to="/login" />;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginSignup />} />
                        <Route path="/shoplist" element={renderRedirect()} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/buy" element={<Buy />} /> {/* Route for Buy page */}
                        <Route path="/sell" element={<Sell />} /> {/* Route for Sell page */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;

