const express = require('express');
const { createOrder, getOrders, getMyOrders, updateOrderStatus } = require('../controllers/orderController');
const { orderLimiter } = require('../middlewares/securityMiddleware');
const { protect, protectCustomer } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', orderLimiter, createOrder);
router.get('/', protect, getOrders);
router.get('/my-orders', protectCustomer, getMyOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
