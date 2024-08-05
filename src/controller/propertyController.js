const propertyService = require('../services/propertyService');

module.exports = {
    async createProperty(req, res) {
        try {
            const user = req.user; 
            const property = await propertyService.createProperty(req, user);
            
            res.status(201).json(property);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getPropertyById(req, res) {
        try {
            const propertyId = req.params.id;
            const property = await propertyService.getPropertyById(propertyId);
            res.status(200).json(property);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async updateProperty(req, res) {
        try {
            const propertyId = req.params.id;
            const updates = req.body;
            const updatedProperty = await propertyService.updateProperty(propertyId, updates);
            res.status(200).json(updatedProperty);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteProperty(req, res) {
        try {
            const propertyId = req.params.id;
            await propertyService.deleteProperty(propertyId);
            res.status(200).json({ message: "Property deleted successfully" });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async getAllProperties(req, res) {
        try {
            const properties = await propertyService.getAllProperties();
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getPropertiesByCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const properties = await propertyService.getPropertiesByCategory(categoryId);
            res.status(200).json(properties);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    async searchProperties(req, res) {
        try {
            
            const keyword = req.query.keyword 
            const properties = await propertyService.searchProperties(keyword);
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async toggleAvailability(req, res) {
        try {
            const propertyId = req.params.id;
            const property = await propertyService.toggleAvailability(propertyId);
            res.status(200).json(property);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};
