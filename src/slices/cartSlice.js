// src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../Firebase/firebaseConfig';  // Import firestore (db) from firebaseConfig

// Thunk to fetch cart items from Firestore
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const cartRef = db.collection('carts').doc(userId); // Use the db (Firestore) reference
    const cartSnapshot = await cartRef.get();
    return cartSnapshot.exists ? cartSnapshot.data().items : [];
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
