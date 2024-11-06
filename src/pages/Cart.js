// src/pages/Cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// src/pages/Cart.js
import { fetchCartItems, removeItem, clearCart } from '../slices/cartSlice'; // Remove addItem import

import { FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../Firebase/firebaseConfig'; // Correct import

function Cart() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.cart);
    const { user } = useAuth(); // Using useAuth to get the user

    useEffect(() => {
        if (user) {
            dispatch(fetchCartItems(user.uid)); // Fetch cart from Firestore when user logs in
        }
    }, [user, dispatch]);

    const handleRemoveItem = (item) => {
        dispatch(removeItem({ id: item.id, userId: user.uid }));
    };

    const handleClearCart = () => {
        dispatch(clearCart({ userId: user.uid }));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <span>{item.name} - ${item.price}</span>
                                <button onClick={() => handleRemoveItem(item)}>
                                    <FaTrashAlt />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
