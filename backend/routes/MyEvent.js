const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/multer');

const {
    updateEvent,
    getEvents,
    deleteEvent,
    getEventParticipants,
    getInterestedUsers,
} = require('../controller/MyEventController');

router.get('/', authenticate, getEvents);

router.delete('/:eventId', authenticate, deleteEvent);

router.get('/:eventId/participants', getEventParticipants);

router.get('/:eventId/interested', getInterestedUsers);

router.post('/:eventId', authenticate,upload.single('eventImage'), updateEvent);


module.exports = router;