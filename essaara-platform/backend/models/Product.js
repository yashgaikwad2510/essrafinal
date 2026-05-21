const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Candle', 'Soap', 'Skincare', 'Other'] // Adjust as necessary
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [{
    type: String // Array of image URLs
  }],
  
  // Dynamic fields supporting rich content
  keyBenefits: [{
    type: String,
    trim: true
  }],
  coreIngredients: [{
    type: String,
    trim: true
  }],
  fullIngredientList: [{
    type: String, // Supports extensive lists like the soap's 31 herbs
    trim: true
  }],
  safetyWarnings: [{
    type: String,
    trim: true
  }],
  howToUse: {
    type: String // Alternatively, an array of strings if steps are needed
  },
  uniqueFeatures: [{
    type: String, // E.g., 'Plantable concept for candle'
    trim: true
  }]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
