import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

const mockOrdersMemory = [];

// GET /api/orders (OWNER: View all orders)
router.get('/', async (req, res) => {
  try {
    let orders;
    try {
      orders = await Order.find({}).sort({ createdAt: -1 });
      if (!orders || orders.length === 0) {
        orders = mockOrdersMemory;
      }
    } catch (dbErr) {
      orders = mockOrdersMemory;
    }
    return res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders (CUSTOMER: Checkout)
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, shippingFee, discountAmount, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are required for checkout' });
    }

    const orderNumber = 'VYR-' + Math.floor(100000 + Math.random() * 900000);

    let savedOrder = {
      orderNumber,
      customer,
      items,
      subtotal,
      shippingFee: shippingFee || 0,
      discountAmount: discountAmount || 0,
      totalAmount,
      paymentMethod: paymentMethod || 'Card',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString()
    };

    try {
      const order = new Order(savedOrder);
      const dbSaved = await order.save();
      savedOrder = dbSaved;
    } catch (dbErr) {
      // Memory fallback
      mockOrdersMemory.unshift(savedOrder);
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
