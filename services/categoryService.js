const Property = require('../models/property.model');
const Category = require('../models/category.model');

module.exports = {
    async createCategory(name, userId) {
        try {
            // Optionally, you can create a new category without associating a property
            const createdCategory = new Category({
                name
            });

            await createdCategory.save();
            return createdCategory;
        } catch (error) {
            throw new Error(`Failed to create category: ${error.message}`);
        }
    },

    async findCategoryByPropertyId(propertyId) {
        try {
            const categories = await Category.find({ properties: propertyId });
            return categories;
        } catch (error) {
            throw new Error(`Failed to find categories with propertyId ${propertyId}: ${error.message}`);
        }
    },

    async findCategoryById(categoryId) {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                throw new Error(`Category not found with id: ${categoryId}`);
            }
            return category;
        } catch (error) {
            throw new Error(`Failed to find category with id ${categoryId}: ${error.message}`);
        }
    }
};
