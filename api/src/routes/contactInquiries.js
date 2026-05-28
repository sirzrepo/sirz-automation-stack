const express = require('express');
const router = express.Router();
const contactInquiries = require('../models/contactInquiries');
const sendMail = require('../emailService');

// CREATE
// API route to save inquiry + send email
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      serviceOfInterest,
      message,
    } = req.body;

    // =========================
    // 1. Save to database
    // =========================
    const savedInquiry = await contactInquiries.create({
      firstName,
      lastName,
      email,
      phone,
      businessName,
      serviceOfInterest,
      message,
    });

    // =========================
    // 2. Send email
    // =========================
    const subject = "New Contact Request";

    const html = `
      <div>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Service:</strong> ${serviceOfInterest}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    const to = [
      "support@sirz.co.uk",
      "mhatons@gmail.com",
      "femisanusi9@gmail.com",
    ];

    const result = await sendMail(subject, html, html, to);

    return res.status(201).json({
      success: true,
      message: "Contact inquiry submitted successfully",
      data: savedInquiry,
      emailResult: result,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit contact inquiry",
      error: error.message,
    });
  }
});


// READ - All
router.get("/", async (req, res) => {
  try {
    const allContactInquiries = await contactInquiries.find().sort({ createdAt: -1 });
    res.json(allContactInquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact inquiries data", error: err });
  }
});

// READ - Single
router.get("/:id", async (req, res) => {
  try {
    const contactInquiries = await contactInquiries.findById(req.params.id);
    if (!contactInquiries) return res.status(404).json({ message: "Contact inquiries data not found" });
    res.json(contactInquiries);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contact inquiries data", error: err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await contactInquiries.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Contact inquiries data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err });
  }
});

module.exports = router;
