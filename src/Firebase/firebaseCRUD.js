// src/Backend/Firebase/firebaseCRUD.js

import { db } from './firebaseConfig'; // Import Firebase configuration
import { doc, setDoc, getDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Fetch Products from Firestore
export const fetchProductsFromFirestore = async (userId) => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('userId', '==', userId)); // Filter by userId to get products added by the current user
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
};

// Add Product to Firestore
export const addProductToFirestore = async (product) => {
    try {
        await setDoc(doc(db, 'products', product.name), product);
    } catch (error) {
        console.error('Error adding product: ', error);
    }
};

// Update Product in Firestore
export const updateProductInFirestore = async (id, updatedProduct) => {
    try {
        await setDoc(doc(db, 'products', id), updatedProduct, { merge: true });
    } catch (error) {
        console.error('Error updating product: ', error);
    }
};

// Delete Product from Firestore
export const deleteProductFromFirestore = async (id) => {
    try {
        await deleteDoc(doc(db, 'products', id));
    } catch (error) {
        console.error('Error deleting product: ', error);
    }
};
