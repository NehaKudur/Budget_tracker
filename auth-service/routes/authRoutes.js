// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the POST route for signup: http://localhost:5003/auth/signup
router.post('/signup', authController.signup);

module.exports = router;