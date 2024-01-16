const express = require('express');
const postController = require('../controller/post.controller');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/create/:communityId', authenticate,upload.single('postImage') ,postController.createPost);

router.get('/:communityId', authenticate, postController.getPosts);

router.put('/comment/:postId', authenticate, postController.insertComment);

<<<<<<< Updated upstream
router.put('/like/:postId',authenticate, postController.insertLike);
router.get('/update/:postId', authenticate, postController.getPostById);
=======
router.put('/like/:postId', authenticate, postController.insertLike);

router.get('/', authenticate, postController.getAllPosts);
>>>>>>> Stashed changes

module.exports = router;
