const express = require('express');
const router = express.Router();

const {autoCompleteLocation, placeDetails} = require('../controller/location.controller');


router.post('/search', autoCompleteLocation);
router.post('/details', placeDetails);
module.exports = router;