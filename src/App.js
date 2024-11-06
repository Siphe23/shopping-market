import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setUser } from './slices/userSlice'; 
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ShopList from './pages/ShopList';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import { auth, db } from './Firebase/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './assets/Background.css'; // Import the CSS file with background styles

const App = () => {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));  
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const role = userDoc.data()?.role;
        setUserRole(role);  
      } else {
        dispatch(setUser(null));  // Clear user from Redux on logout
        setUserRole(null);  // Reset user role
      }
      setLoading(false);
    });

    return () => unsubscribe();  // Clean up the listener
  }, [dispatch]);

  // Render loading screen if still checking user authentication state
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {/* Apply the rotating background to the entire app */}
      <div className="rotating-background"></div>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Default route to Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Login route */}
          <Route path="/login" element={<LoginSignup />} />

          {/* ShopList route: only accessible if user is logged in and role is seller */}
          <Route 
            path="/shoplist" 
            element={userRole ? (
              userRole === 'seller' ? (
                <ShopList />
              ) : (
                <Navigate to="/" />  // Redirect to Home if user is not a seller
              )
            ) : (
              <Navigate to="/login" />  // Redirect to Login if user is not authenticated
            )}
          />
          
          {/* Cart route (could be protected if needed) */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Any other routes can be added here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

