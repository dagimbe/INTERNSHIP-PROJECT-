// models/booking.model.js
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
  bookingStatus: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  buyerAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  sellerAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  transactionType: { 
    type: String,
    enum: ['Buy', 'Rent','Sell'], 
    required: true
},
bookingStatus:{
type:String,
enum:['Pending','Confirmed','Rejected'],
default:'Pending'
},

  totalItems: Number,
  totalPrice: Number
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
