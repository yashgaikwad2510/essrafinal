const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin');
const connectDb = require('./config/db');

const seedAdmin = async () => {
  try {
    await connectDb();

    const email = 'admin@essaara.com';
    const password = 'essaara123';

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit();
    }

    const admin = new Admin({ email, password });
    await admin.save();

    console.log('Admin created successfully:', email);
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
