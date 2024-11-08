const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes
router.get('/getAllproducts', productController.getAllproducts);
router.post('/createProduct', productController.createProduct);
router.get('/getParticularProduct/:productId', productController.getParticularProduct); // Fetch order by orderId


module.exports = router;
