import React, { useState } from 'react';
import { uploadImage } from '../api/api'; // Image upload function (ensure it's defined)
import axios from 'axios';

const SellersForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Clothes');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(image); // Upload image and get URL
      const product = { name, description, price: parseFloat(price), category, imageUrl };
      
      await axios.post('http://localhost:5000/api/products', product); // Post product to backend

      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setCategory('Clothes');
      setImage(null);
      alert('Product added successfully!');
    } catch (err) {
      setError('Error adding product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Decor">Home Decor</option>
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default SellersForm;
