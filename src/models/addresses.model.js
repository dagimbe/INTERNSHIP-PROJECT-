const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      }   
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
