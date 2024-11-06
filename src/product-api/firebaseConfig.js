// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Path to your service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'base-apparel-8e990.appspot.com' // Replace with your Firebase Storage bucket
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage };
