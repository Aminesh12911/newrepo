const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// Order routes
router.post('/createOrder', orderController.createOrder); // Create a new order
router.get('/getOrder', orderController.getOrder); // Create a new order
router.put('/updateOrder/:orderId', orderController.updateOrder); // Corrected route path



module.exports = router;