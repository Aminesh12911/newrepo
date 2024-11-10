
const Order = require('../models/InwardInventory');
const jwt = require('jsonwebtoken');

const createInwardInventory = async (req, res) => {
    try {
        const { orderId,productId,supplierId,  quantity} = req.body;

        // Generate a unique order ID
        const generatedInwardInventoryId = `${Date.now()}-${Math.floor(Math.random() * 100)}`;

        // Verify the token
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const userId = decoded.id; // Assuming the decoded token has an 'id' field

        // Create a new order instance
        const InwardInventory = new Order({
            InwardInventoryId:generatedInwardInventoryId,
            orderId,
            productId,
            supplierId,
            quantity,
           
        });

        // Save the order to the database
        await InwardInventory.save();
        res.status(201).json({ message: 'item added to inventory successfully', InwardInventory});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getinwardInventory = async (req, res) => {
    try {
        const inwardInventory = await Order.find({}, 'productId orderDate  quantity ');
        res.json(inwardInventory);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to retrieve orders" });
    }
};
module.exports ={
    createInwardInventory,
    getinwardInventory

}