const express = require('express');
const morgan = require('morgan');
const connectDb = require('./config/db');
const { nodeEnv, port } = require('./config/env');
const { applySecurityMiddleware } = require('./middlewares/securityMiddleware');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { protect } = require('./middlewares/authMiddleware');

const app = express();

applySecurityMiddleware(app);

app.use(express.json({ limit: '20kb' }));

if (nodeEnv !== 'test') {
  app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, '0.0.0.0', () => {
      console.log(`Essaara API running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start API:', error.message);
    process.exit(1);
  }
};

startServer();
