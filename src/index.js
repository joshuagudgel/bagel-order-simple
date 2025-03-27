import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createOrder, getOrders, updateOrderStatus } from './controllers/orderController.js';
import { register, login } from './controllers/authController.js';
import { authenticateToken, authorizeRole } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/order-app');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Public routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Protected routes
// Customer and Dev can create orders
app.post(
  '/api/orders', 
  authenticateToken, 
  authorizeRole(['customer', 'dev']), 
  createOrder
);

// Staff and Dev can view orders
app.get(
  '/api/orders', 
  authenticateToken, 
  authorizeRole(['staff', 'dev']), 
  getOrders
);

// Staff and Dev can update order status
app.patch(
  '/api/orders/:orderNum', 
  authenticateToken, 
  authorizeRole(['staff', 'dev']), 
  updateOrderStatus
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});