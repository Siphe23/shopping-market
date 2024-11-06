// src/Frontend/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/productSlice';  // Corrected the typo here
import cartReducer from '../slices/cartSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    product: productReducer,  // Corrected the typo here
    cart: cartReducer,
    user: userReducer,
  },
});

export default store; // Export store to be used in Provider

