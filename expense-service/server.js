const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Add Expense
app.post("/add-expense", async (req, res) => {
  try {
    const data = req.body;
    await db.collection("expenses").add(data);
    res.json({ message: "Expense added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Expenses
app.get("/expenses", async (req, res) => {
  try {
    const snapshot = await db.collection("expenses").get();
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => {
  console.log("Expense Service running on port 5001");
});
