const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const {
    getEvents,
    deleteEvent,
    getEventParticipants
} = require('../controller/MyEventController');

router.get('/', authenticate, getEvents);

router.delete('/:eventId', authenticate, deleteEvent);

router.get('/:eventId/participants', getEventParticipants);


module.exports = router;