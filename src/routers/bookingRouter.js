const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const authenticate = require('../middleWare/authenticate');


router.post('/', authenticate(), bookingController.createBooking);
router.get('/:id', authenticate(), bookingController.getBookingById);
router.put('/:id', authenticate(), bookingController.updateBooking);
router.delete('/:id', authenticate(), bookingController.deleteBooking);
router.get('/users/:userId/', authenticate(), bookingController.getBookingsByUser);
router.get('/properties/:propertyId/', authenticate(), bookingController.getBookingsByProperty);

module.exports = router;
