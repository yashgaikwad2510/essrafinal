const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Product id can only include lowercase letters, numbers, and hyphens.']
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  tagline: {
    type: String,
    trim: true,
    maxlength: 220
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80
  },
  subCategory: {
    type: String,
    trim: true,
    maxlength: 80
  },
  netWt: {
    type: String,
    trim: true,
    maxlength: 80
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  productImages: [{
    type: String,
    trim: true,
    maxlength: 300
  }],

  ingredients: [{
    type: String,
    trim: true,
    maxlength: 160
  }],
  howToUse: [{
    type: String,
    trim: true,
    maxlength: 260
  }],
  otherInfo: {
    type: String,
    trim: true,
    maxlength: 1200
  },
  expiry: {
    type: String,
    trim: true,
    maxlength: 120
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Indexes are already defined in the schema properties
productSchema.index({ category: 1, isActive: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
