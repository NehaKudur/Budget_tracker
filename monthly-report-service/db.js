// monthly-report-service/db.js

const admin = require("firebase-admin"); 
const serviceAccount = require("./serviceAccountKey.json");

// Only initialize Firebase once!
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the Firestore database instance
const db = admin.firestore();

// Export the Authentication service instance (useful later)
const auth = admin.auth();

module.exports = {
    db,
    auth
};