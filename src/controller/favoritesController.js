const favoritesService = require('../services/favoritesService');

const addPropertyToFavorites = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { propertyId } = req.body;
    
    const favorites = await favoritesService.addToFavorites(userId, propertyId);
    return res.status(200).json({ message: 'Property added to favorites', favorites });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removePropertyFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { propertyId } = req.body;
    
    const favorites = await favoritesService.removeFromFavorites(userId, propertyId);
    return res.status(200).json({ message: 'Property removed from favorites', favorites });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id; 
    const favorites = await favoritesService.getFavorites(userId);
    return res.status(200).json({ favorites });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addPropertyToFavorites,
  removePropertyFromFavorites,
  getUserFavorites
};
