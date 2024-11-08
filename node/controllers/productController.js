const Product = require('../models/product.js'); // Corrected import

// Get all products
const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find({}, 'productId price name'); // Fetch only 'productId', 'price', 'name' fields
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to retrieve products" });
    }
};

// Create a new product
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

// Get a particular product by productId
const getParticularProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Access the productId from the route params

        const product = await Product.findOne({ productId }); // Find product by productId

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product); // Send back the found product
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Failed to retrieve product" });
    }
};

module.exports = {
    getAllproducts,
    createProduct,
    getParticularProduct
};
