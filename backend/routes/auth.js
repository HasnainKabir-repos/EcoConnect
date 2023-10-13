const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate the request body using Joi schema
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Find a user with the provided email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "User not Exists" });
    }

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid Password" });
    }

    // Generate an authentication token for the user
    const token = user.generateAuthToken();

    // Send a successful response with the token
    res.status(200).send({ data: token, message: "Login Successful" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Validation function using Joi schema
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = router;
