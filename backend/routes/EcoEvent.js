const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');


const {
    deleteEvent,
    getEventsCreatedByUser,
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
} = require('../controller/EcoEventController');


router.post('/', authenticate, EcoEventCreate);

router.get('/', getEcoEvent);

router.get('/', authenticate, getEventsCreatedByUser);

router.put('/addParticipants/:eventId', authenticate, EcoEventAddParticipant);

router.put('/addInterestedUser/:eventId', authenticate, EcoEventMarkInterestedUser);

router.delete('/:eventId', authenticate, deleteEvent);


module.exports = router;