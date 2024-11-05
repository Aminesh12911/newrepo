// models product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, unique: true }, 
    name: { type: String },
    price:{type:Number},          // product's full name
   
});

module.exports = mongoose.model( 'product', productSchema);
