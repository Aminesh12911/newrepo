const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const upload = require('../middleware/multer')


// Order routes
router.post('/createOrder',orderController.createOrder); // Create a new order
router.get('/getOrder', orderController.getOrder); // Create a new order
router.put('/updateOrder/:orderId', orderController.updateOrder); // Corrected route path
router.get('/getParticularOrder/:orderId', orderController.getParticularOrder); // Fetch order by orderId
router.post('/uploadProof/:orderId', upload.single('proof'), orderController.uploadProof);




module.exports = router;
