// auth-service/server.js

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config(); // Reads local .env file

// --- CRITICAL SECURITY FIX FOR RENDER DEPLOYMENT ---

// 1. Safety check: Exit if the key is missing in production
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    // This message will appear in Render's logs if the variable is not set.
    console.error("FATAL ERROR: FIREBASE_SERVICE_ACCOUNT environment variable is not set!");
    // Exit the process, as the service cannot connect to Firebase without credentials
    // process.exit(1); 
    
    // For local development, we fall back to the local file method:
    const serviceAccount = require("./serviceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    // 2. Load the key from the secure environment variable provided by Render
    const serviceAccountContent = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountContent), // Use the JSON parsed from the environment variable
    });
}

// --- End of critical setup ---

const app = express();
const authRoutes = require("./routes/authRoutes"); // Assuming this is the correct path

app.use(cors());
app.use(express.json());

// Main routes for authentication
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5003; // Use 5003 locally

app.listen(PORT, () => console.log(`Auth Service listening on http://localhost:${PORT}`));