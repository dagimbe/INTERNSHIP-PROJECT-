const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference to the Category model
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property' // Reference to the Property model
  },
  inStock: {
    type: Boolean,
    default: true // Indicates if the feature is available or not
  }
});

const Feature = mongoose.model('Feature', featureSchema);
module.exports = Feature;
