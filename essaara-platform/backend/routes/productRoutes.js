const express = require('express');
const { getProductById, getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, upload.array('productImages', 5), createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', protect, upload.array('productImages', 5), updateProduct);
router.delete('/:productId', protect, deleteProduct);

module.exports = router;
