// monthly-report-service/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Define routes for report generation and retrieval
router.post('/generate', reportController.generateMonthlyReport);
router.get('/:monthYear', reportController.getReport);

module.exports = router;