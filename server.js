const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Email Configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // Important: Force IPv4 as some cloud providers have issues with IPv6 to Gmail
    family: 4,
    // Increase timeout
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('--------------------------------------------------');
        console.log('🔴 CONNECTION ERROR:');
        console.log(error);
        console.log('--------------------------------------------------');
        console.log('DEBUG INFO:');
        console.log('Loaded EMAIL_USER:', process.env.EMAIL_USER ? process.env.EMAIL_USER : 'Not Found!');
        console.log('Loaded EMAIL_PASS:', process.env.EMAIL_PASS ? '********' + (process.env.EMAIL_PASS.length > 5 ? ' (Length: ' + process.env.EMAIL_PASS.length + ')' : ' (Short/Empty)') : 'Not Found!');
        console.log('TIP: Ensure valid App Password in .env (Not your login password)');
        console.log('--------------------------------------------------');
    } else {
        console.log('--------------------------------------------------');
        console.log('✅ SMTP Connection Established Successfully!');
        console.log('Ready to send emails as:', process.env.EMAIL_USER);
        console.log('--------------------------------------------------');
    }
});

// API Endpoint to send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'pramodbenagal@gmail.com', // Where you want to receive the emails
        subject: `New ProjectHub Inquiry from ${name}`,
        text: `You have received a new message from ProjectHub Contact Form.
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}`
    };

    // Check for credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res.status(500).json({ error: 'Server configuration error: Missing email credentials on server.' });
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error.toString() }); // Send exact error to client
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
