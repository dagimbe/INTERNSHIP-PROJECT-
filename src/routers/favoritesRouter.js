const express = require('express');
const router = express.Router();
const favoritesController = require('../controller/favoritesController');
const authenticate = require('../middleWare/authenticate');

router.post('/add', authenticate(), favoritesController.addPropertyToFavorites);
router.post('/remove', authenticate(), favoritesController.removePropertyFromFavorites);
router.get('/', authenticate(), favoritesController.getUserFavorites);

module.exports = router;
