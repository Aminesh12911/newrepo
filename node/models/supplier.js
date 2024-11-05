// models/Supplier.js
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    supplierId: { type: String, unique: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },              // Supplier's full name
    cell: { type: String },              // Cell phone number
    home: { type: String },              // Home phone number
    gender: { type: String, enum: ['Male', 'Female', 'Other'] }, // Gender/Sex
});

module.exports = mongoose.model('Supplier', SupplierSchema);
