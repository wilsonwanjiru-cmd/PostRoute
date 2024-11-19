const express = require('express');
const placesControllers = require('../controllers/places-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// GET Place by ID
router.get('/:pid', placesControllers.getPlaceById);

// GET Places by User ID
router.get('/user/:uid', placesControllers.getPlaceByUserId);
router.use(checkAuth); // Protect routes below this middleware

// POST Create a new place
router.post('/', placesControllers.createPlace);

module.exports = router;

