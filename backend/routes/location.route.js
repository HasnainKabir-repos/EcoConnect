const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
    autoCompleteLocation, 
    placeDetails,
    findNearbyEvents
} = require('../controller/location.controller');


router.post('/search', autoCompleteLocation);
router.post('/details', placeDetails);
router.post('/search/nearby', authenticate, findNearbyEvents);
module.exports = router;