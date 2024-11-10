const express = require('express');
const router = express.Router();
const inwardInventoryController = require('../controllers/inwardInventoryController');


// Order routes
router.post('/createInwardInventory',inwardInventoryController.createInwardInventory); // Create a new order
router.get('/getInwardInventory',inwardInventoryController.getinwardInventory); // Create a new order



module.exports = router;
