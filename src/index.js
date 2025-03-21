import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createOrder, getOrders, updateOrderStatus } from './controllers/orderController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/order-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.post('/api/orders', createOrder);
app.get('/api/orders', getOrders);
app.patch('/api/orders/:orderId', updateOrderStatus);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});