const mongoose = require('mongoose');

const propertyCategorySchema = new mongoose.Schema({
  name: String,
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

const PropertyCategory = mongoose.model('PropertyCategory', propertyCategorySchema);
module.exports = PropertyCategory;
