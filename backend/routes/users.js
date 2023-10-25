const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const UserProfile = require('../models/userProfile');
const {getUserName} = require('../controller/userProfileController');
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send({ message: "User already registered" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        // Create a user profile for the newly registered user
        const userProfile = new UserProfile({
            useremail: req.body.email,
        });

        // Save the user profile
        await userProfile.save();
        res.status(201).send({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;