const { z } = require('zod');
const Order = require('../models/Order');
const Product = require('../models/Product');

const cleanText = (value) => value.trim().replace(/\s+/g, ' ');

const orderSchema = z.object({
  customer: z.object({
    firstName: z.string().trim().min(1).max(60).transform(cleanText),
    lastName: z.string().trim().min(1).max(60).transform(cleanText),
    email: z.string().trim().email().max(254).toLowerCase(),
    phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number.').transform(cleanText)
  }),
  shippingAddress: z.object({
    address: z.string().trim().min(5).max(180).transform(cleanText),
    city: z.string().trim().min(2).max(80).transform(cleanText),
    postalCode: z.string().trim().regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit PIN code.')
  }),
  paymentMethod: z.enum(['cod', 'online']),
  items: z.array(
    z.object({
      productId: z.string().trim().regex(/^[a-z0-9-]+$/),
      quantity: z.number().int().min(1).max(25)
    })
  ).min(1).max(20)
});

const SHIPPING_THRESHOLD = 1500;
const STANDARD_SHIPPING_COST = 150;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createOrder = async (req, res, next) => {
  const decrementedItems = [];

  try {
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
        const user = await User.findById(decoded.id);
        if (user) userId = user._id;
      } catch (e) {
        // Ignore token errors, fallback to guest checkout
      }
    }

    const payload = orderSchema.parse(req.body);
    const requestedItems = payload.items.reduce((acc, item) => {
      acc.set(item.productId, (acc.get(item.productId) || 0) + item.quantity);
      return acc;
    }, new Map());

    const products = await Product.find({
      productId: { $in: [...requestedItems.keys()] },
      isActive: true
    });

    if (products.length !== requestedItems.size) {
      res.status(400);
      throw new Error('One or more products are unavailable.');
    }

    const orderItems = [];
    let subtotal = 0;

    for (const product of products) {
      const quantity = requestedItems.get(product.productId);

      const updatedProduct = await Product.findOneAndUpdate(
        {
          productId: product.productId,
          isActive: true,
          stock: { $gte: quantity }
        },
        { $inc: { stock: -quantity } },
        { new: true }
      );

      if (!updatedProduct) {
        res.status(409);
        throw new Error(`${product.name} does not have enough stock.`);
      }

      decrementedItems.push({ productId: product.productId, quantity });

      const lineTotal = product.price * quantity;
      subtotal += lineTotal;

      orderItems.push({
        product: product._id,
        productId: product.productId,
        name: product.name,
        quantity,
        unitPrice: product.price,
        lineTotal
      });
    }

    const shippingCost = subtotal > SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

    const createdOrder = await Order.create({
      user: userId,
      customer: payload.customer,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'online' ? 'paid' : 'pending',
      items: orderItems,
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    return res.status(201).json({
      message: 'Order placed successfully.',
      order: {
        id: createdOrder._id,
        status: createdOrder.orderStatus,
        subtotal: createdOrder.subtotal,
        shippingCost: createdOrder.shippingCost,
        total: createdOrder.total,
        createdAt: createdOrder.createdAt
      }
    });
  } catch (error) {
    if (decrementedItems.length > 0) {
      await Promise.all(
        decrementedItems.map((item) =>
          Product.updateOne(
            { productId: item.productId },
            { $inc: { stock: item.quantity } }
          )
        )
      );
    }

    return next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('items.product', 'images').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product', 'images').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getMyOrders, updateOrderStatus };
