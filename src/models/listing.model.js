const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  name: String,
  description: String,
  propertyType: String, // Changed from cuisineType to propertyType
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address' // Reference to the Address model
  },
  contactInformation: {}, // You might want to provide more specific fields here
  availabilityHours: String, // Changed from openingHours to availabilityHours
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' // Reference to the Booking model
  }],
  numRating: String,
  image: [String],
  registrationDate: {
    type: Date,
    default: Date.now
  },
  open: Boolean,
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature' // Reference to the Feature model
  }]
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
