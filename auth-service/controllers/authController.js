// controllers/authController.js

const admin = require('firebase-admin');
const auth = admin.auth(); // Use the initialized Firebase Auth object

// Handles user creation (Signup)
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required.' });
    }

    try {
        // Creates a user in Firebase Auth
        const user = await auth.createUser({ email, password });
        
        // Respond with success message and user UID (Unique Identifier)
        res.status(201).send({ 
            message: 'User created successfully.', 
            uid: user.uid 
        });
    } catch (error) {
        // Handle Firebase errors (e.g., email already in use)
        res.status(500).send({ 
            message: 'Error creating user.', 
            error: error.message 
        });
    }
};