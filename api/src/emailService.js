const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    // service: "gmail", // Use your email provider (e.g., Gmail, Outlook, etc.)
    auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email app password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send an email
const sendMail = async (subject, text, html, to) => {
    try {
        const mailOptions = {
            from: `"SIRz" <${process.env.SMTP_USER}>`,
            to, // Recipient email
            subject, // Email subject
            text, // Plain text body
            html, // HTML body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return { success: true, message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email", error: error.message };
    }
};

module.exports = sendMail;
