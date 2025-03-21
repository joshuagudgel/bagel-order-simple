import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  customerName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  eggs: { type: Number, required: true },
  cheese: { type: String, required: true },
  bagel: { type: String, required: true },
  spread: { type: String, required: true },
  orderNotes: { type: String },
  isComplete: { type: Boolean, default: false },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;