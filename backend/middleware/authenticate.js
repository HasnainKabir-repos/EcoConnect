const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No tokens found' });
        }

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if (!decoded._id) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticate;
