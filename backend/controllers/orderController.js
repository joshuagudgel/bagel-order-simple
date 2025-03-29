import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  console.log("API createOrder");
  try {
    const orderCount = await Order.countDocuments();
    const newOrder = new Order({
      ...req.body,
      orderNum: orderCount + 1, // Increment the order ID
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  console.log("API getOrders");
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  console.log("API updateOrderStatus");
  const { orderNum } = req.params;
  const { isComplete } = req.body;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNum: Number(orderNum) },
      { isComplete },
      { new: true } // Return the updated document
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};