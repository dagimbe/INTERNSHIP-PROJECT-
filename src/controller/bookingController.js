
const bookingService = require('../services/bookingService');


exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const user = req.user; 
    const booking = await bookingService.createBooking(bookingData, user);
    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updates = req.body;
    const booking = await bookingService.updateBooking(bookingId, updates);
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const result = await bookingService.deleteBooking(bookingId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await bookingService.getBookingsByUser(userId);
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getBookingsByProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const bookings = await bookingService.getBookingsByProperty(propertyId);
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

};
exports.getAllBookings=async(req, res)=> {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};