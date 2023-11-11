const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');


const {
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
} = require('../controller/EcoEventController');


router.post('/', authenticate, EcoEventCreate);

router.get('/', authenticate, getEcoEvent);

router.put('/addParticipants/:eventId', authenticate, EcoEventAddParticipant);

router.put('/addInterestedUser/:eventId', authenticate, EcoEventMarkInterestedUser);




module.exports = router;