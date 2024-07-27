const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');
const authenticate = require('../middleWare/authenticate'); // Ensure correct path to middleware

// Route to create a new property
router.post('/', authenticate, propertyController.createProperty);

// Route to get a property by ID
router.get('/:id', propertyController.getPropertyById);

// Route to update a property by ID
router.put('/:id', authenticate, propertyController.updateProperty);

// Route to delete a property by ID
router.delete('/:id', authenticate, propertyController.deleteProperty);

// Route to get all properties
router.get('/', propertyController.getAllProperties);

// Route to get properties by category
router.get('/category/:categoryId', propertyController.getPropertiesByCategory);

// Route to search properties
router.get('/search', propertyController.searchProperties);

// Route to toggle property availability
router.patch('/:id/toggle', authenticate, propertyController.toggleAvailability);

module.exports = router;
