// server/index.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';

// dotenv.config();

// const app = express();

// // CORS (Allow only your frontend)
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default
//   methods: ['GET', 'POST'],
// }));

// app.use(express.json());

// // --- MongoDB Connection ---
// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1); // Stop server if DB fails
//   }
// })();

// // --- Mongoose Model ---
// const messageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   subject: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// const Message = mongoose.model('Message', messageSchema);

// // --- Nodemailer Transporter ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// (async () => {
//   try {
//     await transporter.verify();
//     console.log('✅ SMTP ready to send messages');
//   } catch (err) {
//     console.error('❌ SMTP configuration problem:', err.message);
//   }
// })();

// // --- API Route ---
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ success: false, error: 'All fields are required' });
//     }

//     // Save to MongoDB
//     const newMessage = new Message({ name, email, subject, message });
//     await newMessage.save();

//     // Email details
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_TO || process.env.EMAIL_USER,
//       replyTo: email,
//       subject: `Contact form: ${subject}`,
//       text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
//     };

//     // Send email
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log('📧 Email sent successfully');
//       return res.status(201).json({ success: true, saved: true, emailSent: true });
//     } catch (err) {
//       console.error('❌ Error sending email:', err.message);
//       return res.status(201).json({
//         success: true,
//         saved: true,
//         emailSent: false,
//         warning: 'Saved to DB but failed to send email',
//       });
//     }

//   } catch (error) {
//     console.error('❌ /api/contact error:', error.message);
//     return res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// // --- Start Server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// api/contact.js
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const MONGO_URI = process.env.MONGO_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

// --- Mongoose model setup (cache connection in global object to avoid re-connecting)
let conn = null;
async function connectToDB() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGO_URI);
  return conn;
}

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    await connectToDB();
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO || EMAIL_USER,
      replyTo: email,
      subject: `Contact form: ${subject}`,
      text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    });

    res.status(200).json({ success: true, saved: true, emailSent: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

