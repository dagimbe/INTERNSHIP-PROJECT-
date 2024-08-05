const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
    try {
        const { name, transactionType, addressId,  } = req.body;
        const category = await categoryService.createCategory(name, transactionType, addressId, req.user.id);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.findCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoriesByProperty = async (req, res) => {
    try {
        const categories = await categoryService.findCategoryByPropertyId(req.params.propertyId);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryByAddress = async (req, res) => {
    try {
        const categories = await categoryService.findCategoryByAddress(req.params.addressId);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryByTransactionType = async (req, res) => {
    try {
        const categories = await categoryService.findCategoryByTransactionType(req.params.transactionType);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
