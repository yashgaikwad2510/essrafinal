const express = require('express');
const { loginAdmin, verifyToken } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/verify', protect, verifyToken);

module.exports = router;
