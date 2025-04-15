const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendMail = require('../emailService');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, password });
    
    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const emailSubject = 'Verify Your Email';
    const emailText = `Your verification code is: ${otp}. This code will expire in 10 minutes.`;
    const emailHtml = `
      <h1>Email Verification</h1>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    `;

    await sendMail(emailSubject, emailText, emailHtml, email);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email for verification code.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isValid = user.verifyOTP(otp);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined; // Clear the OTP
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Email verified successfully',
      token
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP',
      error: error.message
    });
  }
});

// Resend OTP route
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified'
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    const emailSubject = 'Verify Your Email';
    const emailText = `Your new verification code is: ${otp}. This code will expire in 10 minutes.`;
    const emailHtml = `
      <h1>Email Verification</h1>
      <p>Your new verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    `;

    await sendMail(emailSubject, emailText, emailHtml, user.email);

    res.json({
      success: true,
      message: 'New verification code sent successfully'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resending verification code',
      error: error.message
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email first'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

module.exports = router; 