const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    available: Boolean,
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
    },
    transactionType: { 
        type: String,
        enum: ['Buy', 'Rent','Sell'], 
        required: true
    },
    propertyStatus:{
        type:String,
        enum:['Available','Sold','Rented'],
        default:'Available'
    },
    bathroom:{
        type:String,
        default:1
    },
    bedroom:{
        type:String,
        default:1
    },
    

});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
