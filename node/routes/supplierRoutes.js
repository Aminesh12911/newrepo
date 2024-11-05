const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Routes
router.post('/register', supplierController.register);
router.post('/login', supplierController.login);
router.get('/supplierProfile', supplierController.supplierProfile);
router.put('/updateSupplierProfile', supplierController.updateSupplierProfile);
router.get('/getAllSuppliers', supplierController.getAllSuppliers);


module.exports = router;
