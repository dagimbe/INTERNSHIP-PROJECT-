const Favorites = require('../models/favorites.model.js');
const Property = require('../models/property.model');

const addToFavorites = async (userId, propertyId) => {
  try {

    const property = await Property.findById(propertyId);
    if (!property) {
      throw new Error('Property not found');
    }

    let favorites = await Favorites.findOne({ user: userId });
    if (!favorites) {
      favorites = new Favorites({ user: userId, properties: [] });
    }

    if (favorites.properties.includes(propertyId)) {
      throw new Error('Property is already in favorites');
    }
    favorites.properties.push(propertyId);
    await favorites.save();

    return favorites;
  } catch (error) {
    throw new Error(`Failed to add property to favorites: ${error.message}`);
  }
};

const removeFromFavorites = async (userId, propertyId) => {
  try {

    const favorites = await Favorites.findOne({ user: userId });
    if (!favorites) {
      throw new Error('No favorites found for this user');
    }


    const propertyIndex = favorites.properties.indexOf(propertyId);
    if (propertyIndex === -1) {
      throw new Error('Property not found in favorites');
    }

    favorites.properties.splice(propertyIndex, 1);
    await favorites.save();

    return favorites;
  } catch (error) {
    throw new Error(`Failed to remove property from favorites: ${error.message}`);
  }
};

const getFavorites = async (userId) => {
  try {
 
    const favorites = await Favorites.findOne({ user: userId }).populate('properties');
    if (!favorites) {
      return { properties: [] };
    }

    return favorites;
  } catch (error) {
    throw new Error(`Failed to get user favorites: ${error.message}`);
  }
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getFavorites
};
