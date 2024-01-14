const express = require('express');
const communityController = require('../controller/community.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', communityController.createCommunity);

router.get('/', communityController.getAllCommunities);

router.put('/join/:communityId', authenticate, communityController.joinCommunity);

router.get('/joined',authenticate, communityController.getJoinedCommunities);

router.get('/notjoined', authenticate, communityController.getNotJoinedCommunities);

router.get('/:communityId',authenticate, communityController.getCommunityById);

module.exports = router;
