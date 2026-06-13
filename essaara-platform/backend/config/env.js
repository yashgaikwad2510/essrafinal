const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['MONGO_URI'];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const parseOrigins = (value) =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI,
  clientOrigins: parseOrigins(process.env.CLIENT_ORIGIN || 'http://localhost:5173, http://localhost:5174, http://localhost:5175')
};
