const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['bath-body', 'candles', 'fragrance'],
      required: true 
    },
    subCategory: { type: String },
    price: { type: Number, required: true },
    netWt: { type: String },
    ingredients: { type: [String] },
    howToUse: { type: [String] },
    otherInfo: { type: String },
    expiry: { type: String },
    productImages: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
    tagline: { type: String }
  },
  { timestamps: true }
);

// Map _id to id
productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
