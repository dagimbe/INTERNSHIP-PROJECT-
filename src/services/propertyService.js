const Property = require('../models/property.model');
const Address = require('../models/addresses.model');
const Category = require('../models/category.model');

module.exports = {
    async createProperty(req, user) {
        try {
            
            console.log(`Request Body: ${JSON.stringify(req.body)}`);
            const { 
                name, 
                description, 
                price, 
                image, 
                available, 
                isFurnished, 
                isSeasonal, 
                category, 
                location,
                transactionType ,
                bathroom,
                bedroom,

            } = req.body;
    
            
            if (!category || !location) {
                throw new Error("Category and Address IDs are required");
            }
    
            // Validate Category
            const categoryDoc = await Category.findById(category);
            if (!categoryDoc) {
                console.error(`Category not found: ${category}`);
                throw new Error(`Category not found: ${category}`);
            }
    
            // Validate Address
            const addressDoc = await Address.findById(location);
            if (!addressDoc) {
                console.error(`Address not found: ${location}`);
                throw new Error(`Address not found: ${location}`);
            }
    
            // Create and save property
            const property = new Property({
                name,
                description,
                price,
                image,
                available,
                isFurnished,
                isSeasonal,
                category, 
                location, 
                creationDate: new Date(),
                transactionType,
                owner: user._id,
                bathroom,
                bedroom,
            });
    
            const savedProperty = await property.save();
            return savedProperty;
        } catch (error) {
            console.error(`Failed to create property: ${error.message}`);
            throw new Error(`Failed to create property: ${error.message}`);
        }
    },

    async getPropertyById(propertyId) {
        try {
            console.log(`Retrieving property with ID: ${propertyId}`);
            const property = await Property.findById(propertyId).populate('category').populate('location');
            if (!property) {
                console.error(`Property not found with ID: ${propertyId}`);
                throw new Error("Property not found");
            }
            return property;
        } catch (error) {
            console.error(`Failed to retrieve property: ${error.message}`);
            throw new Error(`Failed to retrieve property: ${error.message}`);
        }
    },

    async updateProperty(propertyId, updates) {
        try {
            console.log(`Updating property with ID: ${propertyId}`);
            const property = await Property.findByIdAndUpdate(propertyId, updates, { new: true });
            if (!property) {
                console.error(`Property not found for update with ID: ${propertyId}`);
                throw new Error("Property not found");
            }
            return property;
        } catch (error) {
            console.error(`Failed to update property: ${error.message}`);
            throw new Error(`Failed to update property: ${error.message}`);
        }
    },

    async deleteProperty(propertyId) {
        try {
            console.log(`Deleting property with ID: ${propertyId}`);
            const property = await Property.findById(propertyId);
            if (!property) {
                console.error(`Property not found for deletion with ID: ${propertyId}`);
                throw new Error("Property not found");
            }
            await Property.findByIdAndDelete(propertyId);
            return { message: "Property deleted successfully" };
        } catch (error) {
            console.error(`Failed to delete property: ${error.message}`);
            throw new Error(`Failed to delete property: ${error.message}`);
        }
    },

    async getAllProperties() {
        try {
            console.log(`Retrieving all properties`);
            const properties = await Property.find().populate('category').populate('location');
            return properties;
        } catch (error) {
            console.error(`Failed to retrieve properties: ${error.message}`);
            throw new Error(`Failed to retrieve properties: ${error.message}`);
        }
    },

  
async  searchProperties(keyword = '') {
    try {
      
        const searchCriteria = {
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { 'location.street': { $regex: keyword, $options: 'i' } },
                { 'location.city': { $regex: keyword, $options: 'i' } },
            ]
        };

        const properties = await Property.find(searchCriteria)
            .populate('category')
            .populate('location')
            .populate('transactionType')


        
        return properties;
    } catch (error) {
        console.error(`Failed to search properties: ${error.message}`);
        throw new Error(`Failed to search properties: ${error.message}`);
    }
}
,

    async toggleAvailability(propertyId) {
        try {
            console.log(`Toggling availability for property ID: ${propertyId}`);
            const property = await Property.findById(propertyId);
            if (!property) {
                console.error(`Property not found for toggling availability with ID: ${propertyId}`);
                throw new Error("Property not found");
            }
            property.available = !property.available; 
            await property.save();
            return property;
        } catch (error) {
            console.error(`Failed to toggle availability: ${error.message}`);
            throw new Error(`Failed to toggle availability: ${error.message}`);
        }
    }
};
