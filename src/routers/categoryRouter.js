const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const authenticate = require('../middleWare/authenticate');

// Route to create a new category
router.post('/', authenticate, categoryController.createCategory);

// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to get categories by property ID
router.get('/property/:propertyId', categoryController.getCategoriesByProperty);

module.exports = router;
