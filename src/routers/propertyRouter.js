const express = require('express');
const router = express.Router();
const propertyController = require('../controller/propertyController');
const authenticate = require('../middleWare/authenticate'); 


router.post('/',  authenticate(), propertyController.createProperty);
router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id',  authenticate(), propertyController.updateProperty);
router.delete('/:id',  authenticate(), propertyController.deleteProperty);
router.get('/', propertyController.getAllProperties);
router.get('/category/:categoryId', propertyController.getPropertiesByCategory);
router.patch('/:id/toggle', authenticate, propertyController.toggleAvailability);

module.exports = router;