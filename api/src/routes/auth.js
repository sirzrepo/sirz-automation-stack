const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendMail = require('../emailService');
const generateEmailTemplate = require('../middleware/emailTemplate');

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
    const emailText = `Welcome to Sirz! Your verification code is: ${otp}. This code will expire in 10 minutes.`;
    const emailHtml = generateEmailTemplate({
      title: 'Verify Your Email',
      message: emailText,
      resetToken: otp,
    });

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
    const { email, otp } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ email });
    }

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
      { 
        userId: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send OTP email
    const emailSubject = 'Welcome to Sirz — Let’s Grow Your Brand Together!';
    const emailText = `
      Welcome to Sirz!

      We’re excited to have you join our creative community of entrepreneurs and brands.

      At Sirz, we specialize in helping businesses stand out through:
      - E-commerce solutions that make selling easy and efficient,
      - Branding and design that give your business a unique voice, and
      - Digital marketing strategies that actually deliver results.

      By partnering with Sirz, you gain access to expert support, cutting-edge tools, and a team dedicated to turning your brand into a success story.

      We’re glad to have you on board — your growth starts here.

      Warm regards,
      The Sirz Team
      support@sirz.co.uk
      `;
    const emailHtml = generateEmailTemplate({
      title: 'Welcome to Sirz — Let’s Grow Your Brand Together!',
      message: emailText,
    });

    await sendMail(emailSubject, emailText, emailHtml, email);

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
    const { email } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ email });
    }

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
    const emailHtml = generateEmailTemplate({
      title: 'Verify Your Email',
      message: emailText,
      resetToken: otp,
    });


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
      { 
        userId: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // --- SEND LOGIN EMAIL ---
    const emailSubject = "Welcome Back to Sirz";
    const emailMsg = `
      Hello ${user.first_name || "there"},
      We're glad to see you again! You successfully logged back into your Sirz account.

      If this wasn’t you, please reset your password immediately or contact support.
      
      Warm regards,  
      The Sirz Team  
      support@sirz.co.uk
    `;

    const emailHtml = generateEmailTemplate({
      title: "Welcome Back to Sirz",
      message: emailMsg
    });

    await sendMail(emailSubject, emailMsg, emailHtml, user.email);

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

// Verify email route
// router.post('/resend')

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal if the email exists or not
      return res.json({
        success: true,
        message: 'If your email exists in our system, you will receive a password reset link.'
      });
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = user.generateOTP();
    await user.save();


    const emailSubject = 'Password Reset Request';
    const emailText = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`;
    const emailHtml = `hello from html your reset token is ${resetToken}`;
    
    // const emailHtml = generateEmailTemplate({
    //   title: 'Password Reset Request',
    //   message: emailText,
    //   resetToken: resetToken,
    // });

    await sendMail(emailSubject, emailText, emailHtml, email);

    res.json({
      success: true,
      message: 'If your email exists in our system, you will receive a password reset link.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request',
      error: error.message
    });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required'
      });
    }

    // Find user with email + matching reset token + not expired
    const user = await User.findOne({ email });

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

    // Set new password
    user.password = password;
    user.otp = undefined;

    await user.save();

    // Send confirmation email
    const emailSubject = 'Password Changed Successfully';
    const emailText = `Hello,\n\nThis is a confirmation that the password for your account (${user.email}) has just been changed.\n`;
    
    const emailHtml = generateEmailTemplate({
      title: 'Password Changed Successfully',
      message: emailText,
    });

    await sendMail(emailSubject, emailText, emailHtml, user.email);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);

    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: error.message
    });
  }
});


module.exports = router; 