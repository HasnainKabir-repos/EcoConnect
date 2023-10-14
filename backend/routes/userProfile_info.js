const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const UserProfile = require('../models/userProfile');
const authenticate = require('../middleware/authenticate');


router.post('/', authenticate, async (req, res) => {
    try {
        const { email } = req.user;
        const { bio, address } = req.body;

        const userProfile = {
            useremail: email,
            bio,
            address
        };

        const filter = { useremail: email };
        const options = { new: true, upsert: true };
        const updatedProfile = await UserProfile.findOneAndUpdate(filter, userProfile, options);

        if (updatedProfile) {
            res.status(200).json({ email: email, message: 'User Profile Updated successfully' });
        } else {
            res.status(500).json({ message: 'Failed to update user profile' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user profiles' });
    }
});

router.get('/find', async (req, res) => {
    try {
        const { email } = req.query;
        const userProfiles = await UserProfile.findOne({ useremail: email });

        return res.json(userProfiles);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving user profiles', error: error });
    }
});

module.exports = router;