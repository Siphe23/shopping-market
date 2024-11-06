const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Adjust path to where your JSON file is stored

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'base-apparel-8e990.appspot.com' // Add your Firebase project’s storage bucket name
});

// Export Firebase services for use in other parts of your backend
const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage };
