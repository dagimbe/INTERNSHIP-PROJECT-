const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  totalAmount: Number,
  bookingStatus: String, // Changed from orderStatus to bookingStatus
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingItem' // Changed from OrderItems to BookingItem
  }],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  totalItems: Number,
  totalPrice: Number
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
