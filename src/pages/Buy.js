import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../slices/productSlice'; // Redux actions
import { addProductToFirestore, updateProductInFirestore, deleteProductFromFirestore, fetchProductsFromFirestore } from '../Backend/Firebase/firebaseCRUD'; // Firebase CRUD functions

function Buy() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.user); // Assuming user is stored in Redux

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); // Handle editing a product
    
    useEffect(() => {
        if (user?.uid) {
            fetchProductsFromFirestore(user.uid); // Fetch products for logged-in user
        }
    }, [user?.uid]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImage,
            userId: user.uid, // Associate product with user
        };

        if (editingProduct) {
            await updateProductInFirestore(editingProduct.id, newProduct); // Update product in Firestore
            dispatch(updateProduct(newProduct)); // Update Redux state
        } else {
            await addProductToFirestore(newProduct); // Add new product to Firestore
            dispatch(addProduct(newProduct)); // Add to Redux state
        }

        // Reset form fields
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage('');
        setEditingProduct(null);
    };

    // Handle editing a product
    const handleEdit = (product) => {
        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price);
        setProductImage(product.image);
        setEditingProduct(product); // Set product for editing
    };

    // Handle deleting a product
    const handleDelete = async (id) => {
        await deleteProductFromFirestore(id); // Delete product from Firestore
        dispatch(deleteProduct(id)); // Remove product from Redux state
    };

    // Handle canceling the edit
    const handleCancelEdit = () => {
        setEditingProduct(null);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage('');
    };

    return (
        <div>
            <h1>Buy Products</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                <input type="text" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
                <input type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                {editingProduct && <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
            </form>

            {/* Display Products */}
            <h2>Your Products</h2>
            {loading ? <p>Loading products...</p> : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <img src={product.image} alt={product.name} width="100" />
                            <button onClick={() => handleEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Buy;
