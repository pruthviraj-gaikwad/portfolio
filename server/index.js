// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// --- Mongoose model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// --- Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP configuration problem:', err.message);
  } else {
    console.log('✅ SMTP ready to send messages');
  }
});

// --- API route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact form: ${subject}`,
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('❌ Error sending email:', err.message || err);
        return res.status(201).json({
          success: true,
          saved: true,
          emailSent: false,
          warning: 'Saved to DB but failed to send email. Check server logs.'
        });
      } else {
        console.log('📧 Email sent:', info.response || info);
        return res.status(201).json({ success: true, saved: true, emailSent: true });
      }
    });
  } catch (error) {
    console.error('❌ /api/contact error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
