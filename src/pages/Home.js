import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css'

const Home = () => {
    return (
        <div className="home-container">
            <h1>
                Shopspree<span>.com</span>
                <span className="tagline"> - Your Marketplace Awaits!</span>
            </h1>
            <div className="button-container">
                <Link to="/buy" className="btn buy-btn">
                    Let's Buy
                </Link>
                <Link to="/sell" className="btn sell-btn">
                    Let's Sell
                </Link>
            </div>
        </div>
    );
};


export default Home;
