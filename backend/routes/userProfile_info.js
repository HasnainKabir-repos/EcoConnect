const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const UserProfile = require('../models/userProfile');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Update user profile, including profile image
router.post('/', authenticate, upload.single('profileImage'), async (req, res) => {
    try {
        const { email } = req.user;
        const { firstName, lastName, bio, address } = req.body;

        const profileImagePath = req.file ? req.file.path : undefined; // Check if a file was uploaded

        const userData = {
            $set: {
                firstName: firstName,
                lastName: lastName
            }
        };

        const userProfileData = {
            $set: {
                useremail: email,
                bio: bio,
                address: address,
            }
        };

        if (profileImagePath) {
            userProfileData.$set.profileImage = profileImagePath;
        }

        const filter = { useremail: email };
        const options = { new: true, upsert: true };

        const updatedProfile = await UserProfile.findOneAndUpdate(
            filter,
            userProfileData,
            options
        );
        const updatedUser = await User.findOneAndUpdate(
            filter,
            userData,
            options
        );

        if (updatedProfile && updatedUser) {
            res.status(200).json({ email: email, message: 'User Profile Updated successfully' });
        } else if (!updatedProfile) {
            res.status(500).json({ message: 'Failed to update user profile' });
        } else if (!updatedUser) {
            res.status(500).json({ message: 'Failed to update user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Retrieve user profile
router.get('/', authenticate, async (req, res) => {
    try {
        const { email } = req.user;
        const userProfiles = await UserProfile.findOne({ useremail: email });

        if (userProfiles) {
            res.json(userProfiles);
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
});

// Retrieve user profile by email
router.get('/find', async (req, res) => {
    try {
        const { email } = req.query;
        const userProfiles = await UserProfile.findOne({ useremail: email });

        if (userProfiles) {
            res.json(userProfiles);
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
});

module.exports = router;
