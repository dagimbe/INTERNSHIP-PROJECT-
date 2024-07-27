const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    available: Boolean,
    isFurnished: Boolean,
    isSeasonal: Boolean,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
