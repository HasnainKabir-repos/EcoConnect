const express = require('express');
const postController = require('../controller/post.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create/:communityId', authenticate, postController.createPost);

router.get('/:communityId', authenticate, postController.getPosts);

router.put('/comment/:postId', authenticate, postController.insertComment);

router.put('/like/:postId',authenticate, postController.insertLike);

module.exports = router;
