const express = require('express');
const router = express.Router();
const addressController = require('../controller/addressController');
const authenticate = require('../middleWare/authenticate');


router.post('/', authenticate(), addressController.createAddress);
router.get('/', authenticate(), addressController.getAllAddresses);
router.get('/:id', authenticate(), addressController.getAddressById);
router.put('/:id', authenticate(), addressController.updateAddress);
router.delete('/:id', authenticate(), addressController.deleteAddress);

module.exports = router;
