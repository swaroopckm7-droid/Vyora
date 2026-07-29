import express from 'express';
import Product from '../models/Product.js';
import { sampleProducts } from '../seed/seedData.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, gender, collectionType, search, isNewArrival, isTrending, sort } = req.query;
    
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (gender && gender !== 'All') query.gender = gender;
    if (collectionType && collectionType !== 'All') query.collectionType = collectionType;
    if (isNewArrival === 'true') query.isNewArrival = true;
    if (isTrending === 'true') query.isTrending = true;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    let products;
    try {
      let reqSort = {};
      if (sort === 'price-low') reqSort.price = 1;
      else if (sort === 'price-high') reqSort.price = -1;
      else if (sort === 'rating') reqSort.rating = -1;
      else reqSort.createdAt = -1;

      products = await Product.find(query).sort(reqSort);
      if (!products || products.length === 0) {
        products = filterSampleProducts(req.query);
      }
    } catch (dbErr) {
      products = filterSampleProducts(req.query);
    }

    return res.json({ success: true, count: products.length, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;
    try {
      product = await Product.findById(id);
    } catch (dbErr) {
      product = sampleProducts.find(p => p._id === id || p.slug === id);
    }

    if (!product) {
      product = sampleProducts.find(p => p._id === id || p.slug === id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products (OWNER: Add New Product)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      gender,
      sizes,
      colors,
      images,
      collectionType,
      fabric,
      careInstructions,
      stockCount,
      isNewArrival,
      isTrending
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Product name, price, and category are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

    const newProductData = {
      name,
      slug,
      description: description || 'Luxury garment designed for confidence.',
      price: Number(price),
      originalPrice: Number(originalPrice || price),
      discount: Number(discount || 0),
      category,
      gender: gender || 'Unisex',
      sizes: sizes && sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
      colors: colors && colors.length > 0 ? colors : [{ name: 'Black', hex: '#000000' }],
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'],
      collectionType: collectionType || 'Casual Wear',
      fabric: fabric || '100% Organic Supima Cotton',
      careInstructions: careInstructions || 'Machine wash cool, lay flat to dry.',
      stockCount: Number(stockCount || 50),
      inStock: true,
      isNewArrival: isNewArrival || false,
      isTrending: isTrending || false,
      rating: 5.0,
      reviewsCount: 1
    };

    let createdProduct;
    try {
      const product = new Product(newProductData);
      createdProduct = await product.save();
    } catch (dbErr) {
      // In-memory fallback
      createdProduct = {
        _id: 'prod-custom-' + Date.now(),
        ...newProductData
      };
      sampleProducts.unshift(createdProduct);
    }

    return res.status(201).json({
      success: true,
      message: 'New product added to VyoraThreads catalog successfully!',
      product: createdProduct
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (OWNER: Remove Product)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
    } catch (dbErr) {
      // In memory fallback removal
      const idx = sampleProducts.findIndex(p => p._id === id || p.id === id);
      if (idx !== -1) sampleProducts.splice(idx, 1);
    }
    return res.json({ success: true, message: 'Product removed from catalog' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

function filterSampleProducts(query) {
  let list = [...sampleProducts];
  const { category, gender, collectionType, search, isNewArrival, isTrending, sort } = query;

  if (category && category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (gender && gender !== 'All') {
    list = list.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === 'Unisex');
  }
  if (collectionType && collectionType !== 'All') {
    list = list.filter(p => p.collectionType.toLowerCase() === collectionType.toLowerCase());
  }
  if (isNewArrival === 'true') {
    list = list.filter(p => p.isNewArrival);
  }
  if (isTrending === 'true') {
    list = list.filter(p => p.isTrending);
  }
  if (search) {
    const term = search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }
  if (sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }
  return list;
}

export default router;
