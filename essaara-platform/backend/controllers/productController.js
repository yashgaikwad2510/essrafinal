const Product = require('../models/Product');

const publicProductFields = '-__v -createdAt -updatedAt -isActive';

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true })
      .select(publicProductFields)
      .sort({ createdAt: 1 })
      .lean();

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      productId: req.params.productId,
      isActive: true
    })
      .select(publicProductFields)
      .lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json({ product });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // If images were uploaded, add their URLs to the productData
    if (req.files && req.files.length > 0) {
      productData.productImages = req.files.map(file => file.path);
    }

    // Auto-generate productId if not provided
    if (!productData.productId) {
      productData.productId = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ 
      message: 'Product created successfully',
      product 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product ID already exists. Please choose a different name or ID.' });
    }
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // Parse JSON stringified fields if they exist (because formData sends them as strings)
    ['ingredients', 'howToUse', 'details'].forEach(field => {
      if (typeof productData[field] === 'string') {
        try {
          productData[field] = JSON.parse(productData[field]);
        } catch(e) {
          // keep as string if parsing fails
        }
      }
    });

    // If new images were uploaded, add their URLs to the productData
    if (req.files && req.files.length > 0) {
      productData.productImages = req.files.map(file => file.path);
    }

    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json({ 
      message: 'Product updated successfully',
      product 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
