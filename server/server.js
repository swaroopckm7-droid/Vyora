import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import Product from './models/Product.js';
import { sampleProducts } from './seed/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Gemini AI Full-Body Virtual Try-On Generation Endpoint
app.post('/api/generate-vto', async (req, res) => {
  try {
    const { customerImage, garmentImage, productName, category } = req.body;

    if (!customerImage || !productName) {
      return res.status(400).json({ success: false, message: 'Customer image and product details required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ success: false, message: 'Gemini API key not configured' });
    }

    // Call Gemini 1.5 Flash Vision Endpoint with Strict Full-Body Generation Prompt
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const strictPrompt = `
TASK:
Create a photorealistic FULL-BODY e-commerce fashion model image using the uploaded PERSON photo as identity reference and the GARMENT "${productName}" (${category}).

STRICT RULES:
IDENTITY:
- Preserve the person's facial identity exactly (skin tone, expression, hairstyle, beard, facial features).
- 100% identity preservation. Do NOT merge or blend with another person's face.

BODY & POSE:
- Generate one complete human body matching the uploaded person's natural proportions.
- Generate natural standing full-body posture with feet visible.

GARMENT & APPAREL:
- Replace ONLY the clothing with the uploaded garment "${productName}".
- Preserve garment color, fabric texture, prints, logos, embroidery, and collar/sleeve details exactly.
- Garment must fit naturally with realistic fabric folds and ambient lighting.

IMAGE QUALITY & COMPOSITION:
- Ultra photorealistic e-commerce fashion photography, high resolution, sharp focus.
- Clean luxury studio background with natural shadows.
- No transparency, no ghosting, no circle overlays, no compositing artifacts.
`;

    // Strip base64 prefix if present
    const cleanCustomerBase64 = customerImage.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const inlineParts = [
      { text: strictPrompt },
      {
        inline_data: {
          mime_type: 'image/png',
          data: cleanCustomerBase64
        }
      }
    ];

    if (garmentImage && garmentImage.startsWith('data:image')) {
      const cleanGarmentBase64 = garmentImage.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
      inlineParts.push({
        inline_data: {
          mime_type: 'image/png',
          data: cleanGarmentBase64
        }
      });
    }

    const geminiPayload = {
      contents: [{ parts: inlineParts }]
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });

    const data = await response.json();

    return res.json({
      success: true,
      message: 'Gemini AI full-body fitting processed',
      data: data,
      apiKeyActive: true
    });
  } catch (error) {
    console.error('Gemini VTO API Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Men's Exclusive Categories route
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'tshirts', name: 'T-Shirts', count: 15, image: '/tshirt-1.png' },
    { id: 'shirts', name: 'Shirts', count: 12, image: '/shirt-1.png' },
    { id: 'hoodies', name: 'Hoodies', count: 10, image: '/hoodie-1.png' },
    { id: 'trackpants', name: 'Track Pants', count: 14, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80' }
  ];
  return res.json({ success: true, categories });
});

// Seed Database Route
app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(sampleProducts.map(({ _id, ...rest }) => rest));
    return res.json({ success: true, message: 'Database seeded successfully', count: inserted.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Root Health check
app.get('/', (req, res) => {
  res.send({ status: 'VyoraThreads API Server running', geminiActive: true, timestamp: new Date() });
});

// Start Server & Connect MongoDB
connectDB().then((isMongoConnected) => {
  if (isMongoConnected) {
    Product.deleteMany({}).then(() => {
      Product.insertMany(sampleProducts.map(({ _id, ...rest }) => rest))
        .then(() => console.log('Re-seeded fresh Men T-shirts & Hoodies products to MongoDB'))
        .catch(e => console.error('Auto-seed error:', e));
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`VyoraThreads Backend Server listening on http://0.0.0.0:${PORT}`);
});
