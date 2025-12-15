import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// "Database" file path
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, subject, comments } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !subject || !comments) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newEntry = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            subject,
            comments,
            submittedAt: new Date().toISOString()
        };

        // 1. Save to "Database" (JSON file)
        const currentData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        currentData.push(newEntry);
        fs.writeFileSync(DB_FILE, JSON.stringify(currentData, null, 2));

        console.log('New contact form submission saved to database:', newEntry);

        // 2. Simulate sending email (In a real app, use nodemailer here)
        // Example with nodemailer (commented out):
        /*
        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false,
            auth: { user: "user", pass: "pass" }
        });
        await transporter.sendMail({
            from: '"Nova Wealth" <info@novawealth.co.ke>',
            to: "info@novawealth.co.ke",
            subject: `New Contact: ${subject}`,
            text: `From: ${firstName} ${lastName}\nEmail: ${email}\n\n${comments}`
        });
        */
        console.log(`[Mock Email] Sending email to info@novawealth.co.ke: Subject: ${subject}`);

        // Success response
        res.status(200).json({ 
            success: true, 
            message: 'Message received and saved successfully' 
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
	console.log(`Backend server running on port ${PORT}`);
});
