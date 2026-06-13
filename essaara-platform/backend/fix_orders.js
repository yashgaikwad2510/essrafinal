const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');

require('dotenv').config();

const fixOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      const result = await Order.updateMany(
        { 'customer.email': user.email, user: null },
        { $set: { user: user._id } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Linked ${result.modifiedCount} orders to user ${user.email}`);
      }
    }

    console.log('Order fixing complete');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

fixOrders();
