// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    productId: { type: String }, // Reference to the product
    supplierId: { type: String}, // Reference to the supplier
    orderDate: { type: Date, default: Date.now },
    description: { type: String,},
    quantity: { type: Number,  },
    proof: { type: String }, // Path to proof (could be a URL or file path)
    amount: { type: Number,  },
    status: { type: String, default: 'Pending' }, // Example statuses: Pending, Completed, Cancelled
    invoice: { type: String } // Path to the invoice file
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
