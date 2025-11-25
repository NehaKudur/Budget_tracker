// monthly-report-service/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// The connection to Firebase is now handled exclusively by db.js
require("./db"); 

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); 

// Define and use the report-specific routes
const reportRoutes = require("./routes/reportRoutes");
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => console.log(`Report Service running on port ${PORT}`));

// We no longer export 'db' here, fixing the circular dependency.