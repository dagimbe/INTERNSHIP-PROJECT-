const Property = require('../models/property.model');
const Category = require('../models/category.model');
const Address = require('../models/addresses.model');

module.exports = {
    async createCategory(name, transactionType, addressId) {
        try {
            
            const validTransactionTypes = ['Buy', 'Rent', 'Sell'];
            if (!validTransactionTypes.includes(transactionType)) {
                throw new Error('Invalid transactionType');
            }
    
            const address = await Address.findById(addressId);
            if (!address) {
                throw new Error('Address not found');
            }
    
            const createdCategory = new Category({
                name,
                transactionType,
                address: addressId
            });
    
            await createdCategory.save();
            return createdCategory;
        } catch (error) {
            throw new Error(`Failed to create category: ${error.message}`);
        }
    },    

    async findCategoryByPropertyId(propertyId) {
        try {
            const categories = await Category.find({ properties: propertyId }).populate('address').populate('properties');
            return categories;
        } catch (error) {
            throw new Error(`Failed to find categories with propertyId ${propertyId}: ${error.message}`);
        }
    },

    async findCategoryById(categoryId) {
        try {
            const category = await Category.findById(categoryId).populate('address').populate('properties');
            if (!category) {
                throw new Error(`Category not found with id: ${categoryId}`);
            }
            return category;
        } catch (error) {
            throw new Error(`Failed to find category with id ${categoryId}: ${error.message}`);
        }
    },

    async findCategoryByAddress(addressId) {
        try {
      
            const address = await Address.findById(addressId);
            if (!address) {
                throw new Error('Address not found');
            }

            const categories = await Category.find({ address: addressId }).populate('properties');
            return categories;
        } catch (error) {
            throw new Error(`Failed to find categories with addressId ${addressId}: ${error.message}`);
        }
    },

    async findCategoryByTransactionType(transactionType) {
        try {
        
            const validTransactionTypes = ['Buy', 'Rent', 'Sell'];
            if (!validTransactionTypes.includes(transactionType)) {
                throw new Error('Invalid transactionType');
            }

            const categories = await Category.find({ transactionType }).populate('address').populate('properties');
            return categories;
        } catch (error) {
            throw new Error(`Failed to find categories with transactionType ${transactionType}: ${error.message}`);
        }
    }
};
