const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['ROLE_TENANT', 'ROLE_LANDLORD'],
    default: 'ROLE_TENANT'
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
