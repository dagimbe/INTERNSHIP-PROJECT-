const addressService = require('../services/addressService');

module.exports = {
    async createAddress(req, res) {
        try {
            const address = await addressService.createAddress(req.body);
            res.status(201).json(address);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllAddresses(req, res) {
        try {
            const addresses = await addressService.getAllAddresses();
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAddressById(req, res) {
        try {
            const address = await addressService.getAddressById(req.params.id);
            res.status(200).json(address);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async updateAddress(req, res) {
        try {
            const address = await addressService.updateAddress(req.params.id, req.body);
            res.status(200).json(address);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async deleteAddress(req, res) {
        try {
            await addressService.deleteAddress(req.params.id);
            res.status(200).json({ message: 'Address deleted successfully' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};
