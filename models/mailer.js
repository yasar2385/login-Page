// controllers/email.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendEmail(subject, text, html) {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.TO_ADDRESS,
        subject: subject,
        text: text,
        html: html
    };
    console.log(mailOptions);
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;