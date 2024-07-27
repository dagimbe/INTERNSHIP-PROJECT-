// routes/addressRouter.js
const express = require('express');
const router = express.Router();
const addressController = require('../controller/addressController');
const authenticate = require('../middleWare/authenticate'); // Optional, for authentication

// Route to create a new address
router.post('/', authenticate, addressController.createAddress);

// Route to get all addresses
router.get('/', addressController.getAllAddresses);

// Route to get a specific address by ID
router.get('/:id', addressController.getAddressById);

// Route to update a specific address by ID
router.put('/:id', authenticate, addressController.updateAddress);

// Route to delete a specific address by ID
router.delete('/:id', authenticate, addressController.deleteAddress);

module.exports = router;
