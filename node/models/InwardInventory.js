// models/InwardInventory.js
const mongoose = require('mongoose');

const InwardInventorySchema = new mongoose.Schema({
    InwardInventoryId: { type: String, required: true, unique: true },
    orderId:{type:String},
    productId: { type: String }, // Reference to the product
    supplierId: { type: String}, // Reference to the supplier
    orderDate: { type: Date, default: Date.now },
    quantity:{type:Number}
});

const InwardInventory = mongoose.model('InwardInventory', InwardInventorySchema);
module.exports = InwardInventory;