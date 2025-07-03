const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
const mongoose = require('mongoose');
const sendMail = require("./src/emailService");
const path = require('path');
const bodyParser = require('body-parser');

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
const contentAgentRoutes = require('./src/routes/contentAgenRoutes');
const chatbotRoutes = require('./src/routes/chatbot');
const generateRoutes = require('./src/routes/generateRoutes');
const brandDataRoutes = require('./src/routes/brandData');
const roleRoutes = require('./src/routes/role');
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


//  middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// multer middleware
const fs = require('fs');
const uploadsPath = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

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
app.use('/api/content-agent', contentAgentRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/generate-assets', generateRoutes);
app.use('/api/brand-data', brandDataRoutes);
app.use('/api/roles', roleRoutes);
// API route to send an email
app.post("/subscribe", async (req, res) => {
  const { subject, text, html } = req.body;

  if (!subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail(subject, text, html);
  res.json(result);
});

// API route to send an email for consultation booking
app.post("/consultation-booking", async (req, res) => {
  const { subject, text, html } = req.body;

  if (!subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail( subject, text, html);
  res.json(result);
});

app.post('/api/run-vectorshift', async (req, res) => {
  try {
    const apiRes = await fetch('https://api.vectorshift.ai/v1/pipeline/67efaf5ac7dcc9c27ee9e510/run', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer sk_TrGu5ZyEL7tUaXhYLIw959V3g6yftP9SJrJrm7NrkOmjhuEq",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: req.body.inputs,
      }),
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return res.status(apiRes.status).json({ error: 'Failed to call VectorShift API', details: errorText });
    }

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// API route to send an email
app.post("/contact", async (req, res) => {
  const { subject, text, html } = req.body;

  if (!subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail(subject, text, html);
  res.json(result);
});


// API route to send an email from Mr Femi's portfolio
app.post("/portfolio-leads", async (req, res) => {
  console.log("portfolio-leads", req.body);
  const { subject, text, html} = req.body;

  if (!subject || (!text && !html)) {
    return res.status(400).json({ success: false, message: "Missing email parameters." });
  }

  const result = await sendMail(subject, text, html);
  console.log("portfolio-leads", result);
  res.json(result);
});


app.get("/", (req, res) => {
  res.send("Hello World");
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
