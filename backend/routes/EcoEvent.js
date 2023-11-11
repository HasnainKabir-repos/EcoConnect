const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');


const {
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
    getInterestedEvents,
    getParticipatingEvents
} = require('../controller/EcoEventController');


router.post('/', authenticate, EcoEventCreate);

router.get('/', authenticate, getEcoEvent);

router.put('/addParticipants/:eventId', authenticate, EcoEventAddParticipant);

router.put('/addInterestedUser/:eventId', authenticate, EcoEventMarkInterestedUser);

router.get('/interested', authenticate, getInterestedEvents);

router.get('/participating', authenticate, getParticipatingEvents);




module.exports = router;