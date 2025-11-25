// monthly-report-service/controllers/reportController.js

const { db } = require('../db'); 

// --- CONTROLLER 1: GENERATE REPORT (Live Logic) ---
exports.generateMonthlyReport = async (req, res) => {
    // We expect the client to send the month and year they want the report for (e.g., body: { "year": 2025, "month": 11 })
    const { year, month } = req.body; 
    
    if (!year || !month) {
        return res.status(400).json({ error: 'Year and month are required to generate a report.' });
    }

    try {
        // 1. Define the start and end of the month for querying
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Day 0 of the next month gives the last day of the current month

        // 2. Query Firestore for all expenses within that date range
        // Note: The 'expenses' collection will be populated by your teammate's Expense Service.
        const expensesRef = db.collection('expenses');
        const snapshot = await expensesRef
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .get();

        let totalExpenses = 0;
        
        // 3. Aggregate the total
        snapshot.forEach(doc => {
            // Ensure the 'amount' field is treated as a number
            totalExpenses += parseFloat(doc.data().amount) || 0; 
        });

        // 4. Save the calculated report summary to a new 'reports' collection
        const reportData = {
            month: `${year}-${month}`,
            total: totalExpenses,
            generatedAt: new Date(),
        };

        // Use the month-year string as the document ID for easy retrieval
        await db.collection('reports').doc(`${year}-${month}`).set(reportData);

        res.status(201).json({ 
            message: `Monthly report for ${year}-${month} generated successfully.`,
            report: reportData
        });

    } catch (error) {
        console.error('Error generating monthly report:', error.message);
        res.status(500).json({ error: 'Failed to generate report', detail: error.message });
    }
};

// --- CONTROLLER 2: GET REPORT (Still Placeholder - Next Step) ---
exports.getReport = async (req, res) => {
    const { monthYear } = req.params; // e.g., '2023-11'
    
    try {
        // TODO: Update this to actually query the 'reports' collection
        const mockReport = {
            month: monthYear,
            totalExpenses: 12500,
            income: 20000,
            savings: 7500
        };

        res.status(200).json(mockReport);
        
    } catch (error) {
        console.error('Error fetching report:', error.message);
        res.status(500).json({ error: 'Failed to fetch report' });
    }
};