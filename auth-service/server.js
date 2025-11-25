// auth-service/server.js

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config(); 

// --- FIREBASE ADMIN INITIALIZATION (SECURE FOR RAILWAY) ---

if (process.env.NODE_ENV === "production") {
    console.log("Initializing Firebase using secure environment variable.");
    
    try {
        const serviceAccountContent = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, '\n'));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountContent),
        });
        
    } catch (error) {
        console.error("FATAL ERROR: Failed to parse FIREBASE_SERVICE_ACCOUNT JSON. Check Railway variables.");
    }
    
} else {
    // This runs only in local development
    console.log("Initializing Firebase using local serviceAccountKey.json.");
    
    try {
        const serviceAccount = require("./serviceAccountKey.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        
    } catch (error) {
        console.error("FATAL ERROR: FIREBASE_SERVICE_ACCOUNT is missing, and local serviceAccountKey.json is not found.");
    }
}

// --- END OF FIREBASE INITIALIZATION ---

const app = express();
const authRoutes = require("./routes/authRoutes"); 

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5003; 

app.listen(PORT, () => console.log(`Auth Service listening on port ${PORT}`));//coment