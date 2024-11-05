const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const createOrder = async (req, res) => {
    try {
        const { productId, description, quantity, amount } = req.body;

        // Generate a unique order ID
        const generatedOrderId = `${Date.now()}-${Math.floor(Math.random() * 100)}`;

        // Verify the token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Assuming the decoded token has an 'id' field

        // Create a new order instance
        const order = new Order({
            orderId: generatedOrderId,
            productId,
            userId, // Store userId to associate the order with the supplier
            description,
            quantity,
            amount,
            proof: req.file ? req.file.path : null, // Save proof file path if uploaded
            status: "Pending" // Initial status
        });

        // Save the order to the database
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({}, 'productId orderId orderDate description quantity proof amount status invoice');
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to retrieve orders" });
    }
};

const updateOrder = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params; // Retrieve orderId from route parameters

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId }, // Find order by orderId
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Failed to update order" });
    }
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder
};
