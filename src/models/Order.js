import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  orderDetails: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  eggs: { type: Number, required: true },
  cheese: { type: String, required: true },
  bagel: { type: String, required: true },
  spread: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;