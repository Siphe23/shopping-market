// src/product-api/api.js
const { db, storage } = require('./firebaseConfig');
const axios = require('axios');

// Upload image function
async function uploadImage(imageFile) {
  const bucket = storage.bucket();
  const file = bucket.file(`images/${imageFile.originalname}`);
  await file.save(imageFile.buffer);
  const publicUrl = file.publicUrl();
  return publicUrl;
}

// Upload product data function
async function uploadProduct(product) {
  const productRef = db.collection('products').doc();
  await productRef.set(product);
  return productRef.id;
}

module.exports = { uploadImage, uploadProduct };
