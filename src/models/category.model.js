const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        enum:['Apartment','Studio','Luxury']

    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    transactionType: { 
        type: String, 
        enum: ['Buy', 'Rent', 'Sell'], 
        required: true 
    }

});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
