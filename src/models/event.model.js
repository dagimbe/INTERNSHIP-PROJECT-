const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  image: String,
  startedAt: Date, // Changed to Date for better date handling
  ends: Date, // Changed to Date for better date handling
  name: String,
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property' // Reference to the Property model
  },
  location: String
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
