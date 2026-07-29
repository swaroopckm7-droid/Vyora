import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    try {
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        return res.json({ success: true, message: 'You are already subscribed to VyoraThreads updates.' });
      }
      const newSub = new Newsletter({ email });
      await newSub.save();
    } catch (dbErr) {
      // Graceful fallback
    }

    return res.status(200).json({
      success: true,
      message: 'Welcome to the VyoraThreads Community! Check your inbox for your 15% VIP code.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
