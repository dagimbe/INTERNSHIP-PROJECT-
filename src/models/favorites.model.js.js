const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }],
  total: Number 
});

const Favorites = mongoose.model("Favorites", favoritesSchema);
module.exports = Favorites;
