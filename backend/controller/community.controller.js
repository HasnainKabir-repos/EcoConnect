const Community = require('../models/community');

// Controller for creating a new community
const createCommunity = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCommunity = new Community({
            name,
            description
        });

        await newCommunity.save();

        res.status(201).json({ message: 'Community created successfully', community: newCommunity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating community' });
    }
};
// Controller for getting all communities
const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json({ communities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching communities' });
    }
};
// Controller for joining a community
const joinCommunity = async (req, res) => {
    try {

        const user = req.user;
        const communityId = req.params.communityId;
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        // Check if the user is already a member
        if (community.members.includes(user._id)) {
            return res.status(400).json({ message: 'User is already a member of the community' });
        }

        // Add the user to the community's members array
        community.members.push(user);
        await community.save();

        res.status(200).json({ message: 'User joined the community successfully', community });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error joining the community' });
    }
};

// Controller for getting communities that the user has joined
const getJoinedCommunities = async (req, res) => {
    try {
        const userId = req.user._id;
        const joinedCommunities = await Community.find({ members: userId });
        res.status(200).json({ joinedCommunities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching joined communities' });
    }
};

// Controller for getting communities that the user has not joined
const getNotJoinedCommunities = async (req, res) => {
    try {
        const userId = req.user._id;
        const notJoinedCommunities = await Community.find({ members: { $ne: userId } });
        res.status(200).json({ notJoinedCommunities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching not-joined communities' });
    }
};

const getCommunityById = async (req, res) => {
    try {
        const communityId = req.params.communityId;
        const user = req.user;

        // Find the community by ID and check if the user is a member
        const community = await Community.findOne({ _id: communityId, members: user._id});

        if (!community) {
            return res.status(404).json({ message: 'Community not found or user is not a member' });
        }

        res.status(200).json({ community });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching community' });
    }
};

module.exports = {
    createCommunity,
    getAllCommunities,
    joinCommunity,
    getJoinedCommunities,
    getNotJoinedCommunities,
    getCommunityById
};