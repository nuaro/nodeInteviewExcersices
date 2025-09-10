const express = require('express');
const app = express();

app.use(express.json());

app.post('/user', (req, res) => {
    try {
        const { username, email, age } = req.body;

        // Validation checks
        if (!username || typeof username !== 'string') {
            throw new Error('Invalid username');
        }

        if (!email || !email.includes('@')) {
            throw new Error('Invalid email format');
        }

        if (!age || typeof age !== 'number' || age < 0) {
            throw new Error('Invalid age');
        }

        // Process valid data...
        res.json({ success: true });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});
