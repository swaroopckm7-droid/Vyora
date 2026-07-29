import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  category: { type: String, required: true }, // T-Shirts, Hoodies, Oversized Wear, Shirts, Jeans, Jackets, Accessories
  gender: { type: String, required: true, enum: ['Men', 'Women', 'Unisex'] },
  sizes: [{ type: String }], // XS, S, M, L, XL, XXL
  colors: [{ 
    name: String, 
    hex: String 
  }],
  images: [{ type: String }],
  isNewArrival: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  collectionType: { type: String, default: 'Casual Wear' }, // Streetwear, Casual Wear, Premium Essentials, Summer Collection, Winter Collection
  fabric: { type: String, default: '100% Organic Cotton' },
  careInstructions: { type: String, default: 'Machine wash cold, lay flat to dry' },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 50 }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
