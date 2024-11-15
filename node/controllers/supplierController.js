const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Supplier = require('../models/supplier.js'); // Updated import

const generateSupplierId = () => {
    // Prefix + timestamp + random number for uniqueness
    return `${Date.now()}-${Math.floor(Math.random() * 100)}`;
};

// Register
const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const supplierId = generateSupplierId();

    try {
        const supplier = new Supplier({
            email,
            password: hashedPassword,
            supplierId,
            name: '', // Default empty value
            cell: '', // Default empty value
            home: '', // Default empty value
            gender: null, // Default null value
        });
        await supplier.save();
        res.status(201).json({ message: 'Supplier registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    const supplier = await Supplier.findOne({ email });
    if (!supplier || !(await bcrypt.compare(password, supplier.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Update Supplier Profile
const updateSupplierProfile = async (req, res) => {
    const { name, cell, home, gender } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const supplierId = decoded.id;

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            { name, cell, home, gender },
            { new: true }
        ).select("-password");

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json(updatedSupplier);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

// Get Supplier Profile
const supplierProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const supplier = await Supplier.findById(decoded.id).select("-password");
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });

        res.json(supplier);
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ message: "Unauthorized access" });
    }
};

// Get All Suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({}, 'supplierId name');
        res.json(suppliers);
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ message: "Failed to retrieve suppliers" });
    }
};

// Get Particular Supplier by ID
const getParticularSupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;

        const supplier = await Supplier.findOne({ supplierId });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.json(supplier);
    } catch (error) {
        console.error("Error fetching supplier:", error);
        res.status(500).json({ message: "Failed to retrieve supplier" });
    }
};

module.exports = {
    getAllSuppliers,
    register,
    login,
    supplierProfile,
    updateSupplierProfile,
    getParticularSupplier
};
