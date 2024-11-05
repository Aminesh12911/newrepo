const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes
router.get('/getAllproducts', productController.getAllproducts);
router.post('/createProduct', productController.createProduct);


module.exports = router;
