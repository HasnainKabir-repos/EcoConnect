const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User, validate } = require('../models/user');
const Token = require('../models/token'); // Import the Token model
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/userProfile');


const validateEmailPass = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    });
  
    return schema.validate(data);
  };


const findUser = async(req) => {
    const user = await User.findOne({ email: req.body.email });
    return user;
};


const loginUser = async(req, res) => {
    try {
        const { error } = validateEmailPass(req.body);
        if (error)
          return res.status(400).send({ message: error.details[0].message });
    
        const user = await findUser(req);
        if (!user) {
          return res.status(400).send({ message: "User not Exists" });
        }
    
        // comparing the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(400).send({ message: "Invalid Password" });
        }
    
        // generating an authentication token for the user
        const token = user.generateAuthToken();
    
        // sending a successful response with the token
        res.status(200).send({ data: token, message: "Login Successful" });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Internal Server Error" });
      }
};

const generateSalt = async() => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return salt;
};

const generateHashPassword = async(req, salt) => {
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    return hashPassword;
};

const createNewUser = async(req, hashPassword) => {
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();
}

const signupUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send({ message: "User already registered" });

        const salt = await generateSalt();
        const hashPassword = await generateHashPassword(req, salt);

        await createNewUser(req, hashPassword);

        const userProfile = new UserProfile({
            useremail: req.body.email,
        });

        await userProfile.save();
        res.status(201).send({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};


module.exports = {
    loginUser, 
    signupUser, 
    generateSalt,
    generateHashPassword,
    findUser,
    createNewUser
};