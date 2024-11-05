const Product = require('../models/product.js'); // Updated impor

const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find({}, 'productId price name id'); // Fetch only 'id' and 'name' fields
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};
const createProduct = async (req, res) => {
    const { productId, name, price } = req.body;

    try {
        const newProduct = new Product({ productId, name, price });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ message: "Failed to create product", error: error.message });
    }
};
module.exports = {
    getAllproducts,
    createProduct,
   
};
