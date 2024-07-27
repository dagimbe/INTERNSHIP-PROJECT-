const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart" // Reference to the Cart model
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property" // Reference to the Property model
  },
  quantity: Number, // This might represent the number of properties in the cart if needed

  totalPrice: Number // This might be the total price of the property or a similar concept
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
