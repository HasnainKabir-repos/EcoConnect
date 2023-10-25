const router = require('express').Router();
const { User, validate } = require('../models/user');
const Token = require('../models/token'); // Import the Token model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/userProfile');

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

        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        // Generate an authentication token for the user
         const token = jwt.sign({ _id: newUser._id }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });

        // Store the token in the Token schema
        const tokenDocument = new Token({ userId: newUser._id, token: token });
        await tokenDocument.save();

        res.status(201).send({ message: "User registered successfully", data: token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        await new User({ ...req.body, password: hashPassword }).save();

        // Create a user profile for the newly registered user
        const userProfile = new UserProfile({
            useremail: req.body.email,
        });

        // Save the user profile
        await userProfile.save();
        res.status(201).send({ message: "User registered successfully" });
    }
});

router.post('/getUsername', getUserName);
module.exports = router;
