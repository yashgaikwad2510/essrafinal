require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUser = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const user = await User.findOne({ email: 'yash@gmail.com' });
  if (user) {
    console.log("User found!");
    const isMatch = await user.matchPassword('yash2510');
    console.log("Does 'yash2510' match?", isMatch);
  } else {
    console.log("User not found in the database. This means you need to click 'Sign Up' first to recreate the account.");
  }
  process.exit();
};

checkUser();
