const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/multer');

const {
    updateUserProfile,
    getUserProfile,
} = require('../controller/userProfileController');

// Update user profile, including profile image
router.post('/', authenticate, upload.single('profileImage'), updateUserProfile);

// Retrieve user profile
router.get('/', authenticate, getUserProfile);

// Retrieve user profile by email
router.get('/:useremail', getUserProfile);

module.exports = router;
