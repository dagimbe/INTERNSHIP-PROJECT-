// services/addressService.js
const Address = require('../models/addresses.model');

module.exports = {
    async createAddress(addressData) {
        try {
            const address = new Address(addressData);
            return await address.save();
        } catch (error) {
            throw new Error(`Failed to create address: ${error.message}`);
        }
    },

    async getAllAddresses() {
        try {
            return await Address.find();
        } catch (error) {
            throw new Error(`Failed to retrieve addresses: ${error.message}`);
        }
    },

    async getAddressById(addressId) {
        try {
            const address = await Address.findById(addressId);
            if (!address) {
                throw new Error("Address not found");
            }
            return address;
        } catch (error) {
            throw new Error(`Failed to retrieve address: ${error.message}`);
        }
    },

    async updateAddress(addressId, updateData) {
        try {
            const address = await Address.findByIdAndUpdate(addressId, updateData, { new: true });
            if (!address) {
                throw new Error("Address not found");
            }
            return address;
        } catch (error) {
            throw new Error(`Failed to update address: ${error.message}`);
        }
    },

    async deleteAddress(addressId) {
        try {
            const address = await Address.findById(addressId);
            if (!address) {
                throw new Error("Address not found");
            }
            await Address.findByIdAndDelete(addressId);
            return { message: "Address deleted successfully" };
        } catch (error) {
            throw new Error(`Failed to delete address: ${error.message}`);
        }
    }
};
