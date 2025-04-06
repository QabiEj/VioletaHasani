const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configure Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Prepare email content
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // Violeta's email
        subject: `Contact Form: ${subject}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };
    
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        
        // Send confirmation email to the sender
        const confirmationMail = {
            from: `"Violeta Hasani" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Thank you for your message',
            html: `
                <h3>Thank you for contacting me!</h3>
                <p>Dear ${name},</p>
                <p>I appreciate your message. I will review it and get back to you as soon as possible.</p>
                <p>Best regards,<br>Violeta Hasani<br>Legal Researcher & Academic</p>
            `
        };
        
        await transporter.sendMail(confirmationMail);
        
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
});

// API endpoint for newsletter subscription
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    
    // Prepare email content
    const mailOptions = {
        from: `"Newsletter Subscription" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Violeta's email
        subject: 'New Newsletter Subscription',
        html: `
            <h3>New Newsletter Subscription</h3>
            <p><strong>Email:</strong> ${email}</p>
        `
    };
    
    try {
        // Send notification email to Violeta
        await transporter.sendMail(mailOptions);
        
        // Send confirmation email to subscriber
        const confirmationMail = {
            from: `"Violeta Hasani" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Subscription Confirmation',
            html: `
                <h3>Thank you for subscribing!</h3>
                <p>You have successfully subscribed to receive updates on my latest research and publications.</p>
                <p>Best regards,<br>Violeta Hasani<br>Legal Researcher & Academic</p>
            `
        };
        
        await transporter.sendMail(confirmationMail);
        
        res.status(200).json({ success: true, message: 'You have successfully subscribed!' });
    } catch (error) {
        console.error('Error processing subscription:', error);
        res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again later.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});