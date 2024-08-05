const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const authenticate = require('../middleWare/authenticate');


router.post('/', authenticate("ROLE_ADMIN"), categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById)
router.get('/property/:propertyId', categoryController.getCategoriesByProperty);
router.get('/address/:addressId', categoryController.getCategoryByAddress);
router.get('/transactionType/:transactionType', categoryController.getCategoryByTransactionType);
module.exports = router;
