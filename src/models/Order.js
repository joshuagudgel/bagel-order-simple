import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  orderDetails: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;