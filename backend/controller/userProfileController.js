const { User } = require('../models/user');
const UserProfile = require('../models/userProfile');
const path = require('path');


// Update user profile, including profile image
const updateUserProfile = async (req, res) => {
    try {
        const { email } = req.user;
        const { firstName, lastName, bio, address } = req.body;

        const profileImagePath = req.file ? req.file.path : undefined; // Check if a file was uploaded

        const filter = { useremail: email };
        const options = { new: true, upsert: true };

        // Create an object with the fields to be updated
        const userProfileUpdate = {
            useremail: email,
            bio,
            address,
        };

        if (profileImagePath) {
            userProfileUpdate.profileImage = path.basename(profileImagePath);
        }

        const updatedProfile = await UserProfile.findOneAndUpdate(filter, userProfileUpdate, options);
        const updatedUser = await User.findOneAndUpdate({ email: email }, { firstName, lastName }, options);

        if (updatedProfile && updatedUser) {
            res.status(200).json({ email, message: 'User Profile Updated successfully' });
        } else if (!updatedProfile) {
            res.status(500).json({ message: 'Failed to update user profile' });
        } else if (!updatedUser) {
            res.status(500).json({ message: 'Failed to update user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const { email } = req.user;
        const userProfiles = await UserProfile.findOne({ useremail: email });
        const userInfo = await User.findOne({ email: email });

        if (userProfiles && userInfo) {
            res.json({ userProfiles, userInfo });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};


const getUserName = async (req, res) => {
    try {
        const { email } = req.body;
        const username = await User.findOne({ email: email }).exec();
        res.status(200).json(username);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSpeceficUserProfile = async (req, res) => {
    try {
        const {email} = req.body;
        const userProfiles = await UserProfile.findOne({ useremail: email });
        const userInfo = await User.findOne({ email: email });

        if (userProfiles && userInfo) {
            res.json({ userProfiles, userInfo });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};

module.exports = {
    updateUserProfile,
    getUserProfile,
    getUserName,
    getSpeceficUserProfile
};
