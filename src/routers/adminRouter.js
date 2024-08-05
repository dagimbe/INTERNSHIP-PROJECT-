const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const authenticate = require('../middleWare/authenticate');


router.get('/', authenticate('ROLE_ADMIN'), bookingController.getAllBookings); 
router.get('/:id', authenticate('ROLE_ADMIN'), bookingController.getBookingById); 
router.put('/:id', authenticate('ROLE_ADMIN'), bookingController.updateBooking); 
router.delete('/:id', authenticate('ROLE_ADMIN'), bookingController.deleteBooking);

module.exports = router;
