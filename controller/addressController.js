// controllers/addressController.js
const addressService = require('../services/addressService');

module.exports = {
    async createAddress(req, res) {
        try {
            const addressData = req.body;
            const address = await addressService.createAddress(addressData);
            res.status(201).json(address);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllAddresses(req, res) {
        try {
            const addresses = await addressService.getAllAddresses();
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAddressById(req, res) {
        try {
            const { id } = req.params;
            const address = await addressService.getAddressById(id);
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateAddress(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedAddress = await addressService.updateAddress(id, updateData);
            res.status(200).json(updatedAddress);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteAddress(req, res) {
        try {
            const { id } = req.params;
            const result = await addressService.deleteAddress(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
