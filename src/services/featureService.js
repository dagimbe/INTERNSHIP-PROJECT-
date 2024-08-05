const Feature = require('../models/feature.model');

module.exports = {
    async updateFeatureAvailability(propertyId, availability) {
        try {
            const features = await Feature.find({ property: propertyId });

            for (const feature of features) {
                feature.inStock = availability;
                await feature.save();
            }
            console.log(`Feature availability for property ${propertyId} updated to ${availability}`);
        } catch (error) {
            console.error('Error updating feature availability:', error.message);
        }
    }
};
