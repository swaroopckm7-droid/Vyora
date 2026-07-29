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

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Men's Exclusive Categories route
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'tshirts', name: 'T-Shirts', count: 15, image: '/tshirt-1.png' },
    { id: 'shirts', name: 'Shirts', count: 12, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80' },
    { id: 'hoodies', name: 'Hoodies', count: 10, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
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
  res.send({ status: 'VyoraThreads API Server running', timestamp: new Date() });
});

// Start Server & Connect MongoDB
connectDB().then((isMongoConnected) => {
  if (isMongoConnected) {
    Product.deleteMany({}).then(() => {
      Product.insertMany(sampleProducts.map(({ _id, ...rest }) => rest))
        .then(() => console.log('Re-seeded fresh Men T-shirts products to MongoDB'))
        .catch(e => console.error('Auto-seed error:', e));
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`VyoraThreads Backend Server listening on http://0.0.0.0:${PORT}`);
});
