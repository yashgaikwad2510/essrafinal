const connectDb = require('../config/db');
const Product = require('../models/Product');
const products = require('./products');

const seedProducts = async () => {
  try {
    await connectDb();

    await Product.bulkWrite(
      products.map((product) => ({
        updateOne: {
          filter: { productId: product.productId },
          update: { $set: product },
          upsert: true
        }
      }))
    );

    console.log(`Seeded ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Product seed failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
