const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
const mongoose = require('mongoose');
const sendMail = require("./src/emailService");

const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const projectIdeaRoutes = require('./src/routes/projectIdeaRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const automationRoutes = require('./src/routes/automationRoutes');
const brandcomFormRoutes = require('./src/routes/brandcomFormRoutes');
const leadScoringRoutes = require('./src/routes/leadScoringRoutes');
const landingPageRoutes = require('./src/routes/landingPageRoutes');
// import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/project-ideas', projectIdeaRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/brandcom-form', brandcomFormRoutes);
app.use('/api/lead-scoring', leadScoringRoutes);
app.use('/api/landing-page', landingPageRoutes);

// API route to send an email
app.post("/subscribe", async (req, res) => {
  const { from, subject, text, html } = req.body;

  if (!from || !subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail(from, subject, text, html);
  res.json(result);
});

// API route to send an email for consultation booking
app.post("/consultation-booking", async (req, res) => {
  const {  subject, text, html } = req.body;

  if (!subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail( subject, text, html);
  res.json(result);
});

// API route to send an email
app.post("/contact", async (req, res) => {
  const { from, subject, text, html } = req.body;

  if (!from || !subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail(from, subject, text, html);
  res.json(result);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
