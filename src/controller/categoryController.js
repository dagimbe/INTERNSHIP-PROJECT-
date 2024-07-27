const categoryService = require('../services/categoryService');

module.exports = {
    async createCategory(req, res) {
        try {
            const userId = req.user._id;
            const { name } = req.body;
            const category = await categoryService.createCategory(name, userId);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.id;
            const category = await categoryService.findCategoryById(categoryId);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async getCategoriesByProperty(req, res) {
        try {
            const propertyId = req.params.propertyId;
            const categories = await categoryService.findCategoryByPropertyId(propertyId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};
