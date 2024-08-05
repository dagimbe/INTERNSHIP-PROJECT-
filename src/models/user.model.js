// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  userAddress:String,
  role: {
    type: String,
    enum: ['ROLE_CUSTOMER', 'ROLE_ADMIN'],
    default: 'ROLE_CUSTOMER'
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  // addresses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Address'
  // }],
  resetPasswordToken: String, 
  resetPasswordExpires: Date 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
