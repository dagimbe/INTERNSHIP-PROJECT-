const Property = require('../models/property.model');
const Address = require('../models/addresses.model');
const Category = require('../models/category.model');

module.exports = {
    async createProperty(req, user) {
        try {
            const { name, description, price, image, available, isFurnished, isSeasonal, categoryId, addressId } = req.body;

            console.log(`Creating property with categoryId: ${categoryId} and addressId: ${addressId}`);

            // Validate Category
            const category = await Category.findById(categoryId);
            if (!category) {
                console.error(`Category not found: ${categoryId}`);
                throw new Error("Category not found");
            }

            // Validate Address
            const address = await Address.findById(addressId);
            if (!address) {
                console.error(`Address not found: ${addressId}`);
                throw new Error("Address not found");
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
                category: categoryId,
                location: addressId,
                creationDate: new Date(),
                owner: user._id
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

    async getPropertiesByCategory(categoryId) {
        try {
            console.log(`Retrieving properties for category ID: ${categoryId}`);
            const properties = await Property.find({ category: categoryId }).populate('category').populate('location');
            if (properties.length === 0) {
                console.error(`No properties found for category ID: ${categoryId}`);
                throw new Error("No properties found for this category");
            }
            return properties;
        } catch (error) {
            console.error(`Failed to retrieve properties by category: ${error.message}`);
            throw new Error(`Failed to retrieve properties by category: ${error.message}`);
        }
    },

    async searchProperties(keyword) {
        try {
            console.log(`Searching properties with keyword: ${keyword}`);
            const properties = await Property.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            }).populate('category').populate('location');
            return properties;
        } catch (error) {
            console.error(`Failed to search properties: ${error.message}`);
            throw new Error(`Failed to search properties: ${error.message}`);
        }
    },

    async toggleAvailability(propertyId) {
        try {
            console.log(`Toggling availability for property ID: ${propertyId}`);
            const property = await Property.findById(propertyId);
            if (!property) {
                console.error(`Property not found for toggling availability with ID: ${propertyId}`);
                throw new Error("Property not found");
            }
            property.available = !property.available; // Toggle availability status
            await property.save();
            return property;
        } catch (error) {
            console.error(`Failed to toggle availability: ${error.message}`);
            throw new Error(`Failed to toggle availability: ${error.message}`);
        }
    }
};
