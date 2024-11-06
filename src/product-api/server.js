// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { db, storage } = require('./firebaseConfig');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Set up Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file upload handling
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Route to handle product creation with image upload
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).send('Image is required');
    }

    // Upload image to Firebase Storage
    const bucket = storage.bucket();
    const fileRef = bucket.file(`product-images/${Date.now()}_${imageFile.originalname}`);
    await fileRef.save(imageFile.buffer, {
      metadata: { contentType: imageFile.mimetype },
    });

    // Get the image URL from Firebase Storage
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

    // Add product details to Firestore
    await db.collection('products').add({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Product added successfully', imageUrl });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
