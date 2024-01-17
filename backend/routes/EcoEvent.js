const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const upload = require('../middleware/multer');


const {
    EcoEventAddParticipant,
    EcoEventMarkInterestedUser,
    EcoEventCreate,
    getEcoEvent,
    getInterestedEvents,
    getParticipatingEvents,
    checkInterestedUser,
    checkParticipatingUser
} = require('../controller/EcoEventController');


router.post('/', authenticate,upload.single('eventImage'), EcoEventCreate);

router.get('/', authenticate, getEcoEvent);

router.put('/addParticipants/:eventId', authenticate, EcoEventAddParticipant);

router.put('/addInterestedUser/:eventId', authenticate, EcoEventMarkInterestedUser);

router.get('/interested', authenticate, getInterestedEvents);

router.get('/participating', authenticate, getParticipatingEvents);

router.get('/interested/:eventId', authenticate, checkInterestedUser);
router.get('/participating/:eventId', authenticate,checkParticipatingUser );




module.exports = router;