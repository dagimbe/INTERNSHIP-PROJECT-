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
  total: Number // This field could represent the total count of properties in the favorites list
});

const Favorites = mongoose.model("Favorites", favoritesSchema);
module.exports = Favorites;
