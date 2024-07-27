const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
