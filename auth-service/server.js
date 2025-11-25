// auth-service/server.js

const express = require("express");
const cors = require("cors");
//const admin = require("firebase-admin");
//let serviceAccountContent;
require("dotenv").config(); 

// --- FIREBASE ADMIN INITIALIZATION (SECURE FOR RAILWAY) ---
const admin = require("firebase-admin");

let serviceAccountContent;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccountContent = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("Firebase service account loaded from env variable.");
  } catch (error) {
    console.error("Error parsing Firebase service account JSON:", error);
  }
} else {
  console.error("FIREBASE_SERVICE_ACCOUNT env variable missing!");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountContent),
});

// --- END OF FIREBASE INITIALIZATION ---

const app = express();
const authRoutes = require("./routes/authRoutes"); 

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5003; 

app.listen(PORT, () => console.log(`Auth Service listening on port ${PORT}`));//coment