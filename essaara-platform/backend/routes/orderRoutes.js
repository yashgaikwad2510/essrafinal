const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect, admin } = require('../middleware/authMiddleware');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    if (paymentMethod === 'ONLINE') {
      const options = {
        amount: Math.round(totalPrice * 100), // amount in smallest currency unit (paise)
        currency: 'INR',
        receipt: `receipt_order_${createdOrder._id}`,
      };

      try {
        const razorpayOrder = await razorpay.orders.create(options);
        createdOrder.razorpayOrderId = razorpayOrder.id;
        await createdOrder.save();
        
        return res.status(201).json({
          order: createdOrder,
          razorpayOrder,
        });
      } catch (rzpErr) {
        console.error('Razorpay Error:', rzpErr);
        // Fallback to offline creation if RZP fails during testing
        return res.status(201).json({ order: createdOrder });
      }
    } else {
      res.status(201).json({ order: createdOrder });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Allow admin or the user who placed the order to view it
      if (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
        res.json(order);
      } else {
        res.status(401).json({ message: 'Not authorized to view this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/orders/:id/pay
// @desc    Update order to paid (Razorpay webhook/callback handler)
// @access  Private
router.post('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

      // Verify Signature (optional but recommended in production)
      const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');

      if (expectedSignature === razorpaySignature || process.env.NODE_ENV === 'development') {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = 'paid';
        order.razorpayPaymentId = razorpayPaymentId;
        order.paymentResult = {
          id: razorpayPaymentId,
          status: 'success',
          update_time: new Date().toISOString(),
          email_address: req.user.email,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({ message: 'Invalid payment signature' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- ADMIN ROUTES ---

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.status || 'delivered';
      if (order.orderStatus === 'delivered') {
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
