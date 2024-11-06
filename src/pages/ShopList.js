import React, { useState } from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice'; // Correctly import addItem action

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: 'T-Shirt', category: 'Clothes', price: 19.99, description: 'Comfortable cotton t-shirt.' },
    { id: 2, name: 'Laptop', category: 'Electronics', price: 999.99, description: 'Latest model laptop.' },
    { id: 3, name: 'Wall Art', category: 'Home Decor', price: 29.99, description: 'Beautiful wall art for your home.' },
    { id: 4, name: 'Jeans', category: 'Clothes', price: 49.99, description: 'Stylish denim jeans.' },
    { id: 5, name: 'Headphones', category: 'Electronics', price: 89.99, description: 'Noise-canceling headphones.' },
    { id: 6, name: 'Table Lamp', category: 'Home Decor', price: 39.99, description: 'Modern table lamp.' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch the addItem action
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Decor">Home Decor</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className="icons">
              <FaHeart className="icon" />
              <FaShareAlt className="icon" />
            </div>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList; // Ensure default export
