const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// POST route to send a password reset link
router.post("/", async (req, res) => {
  try {
    // validating the email in the request body
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // finding the user with the provided email
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    // checking if there is an existing token or create a new one
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    // generating the password reset link
    const resetPasswordUrl = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;

    // Compose and send the password reset email
    const emailBody = `<p>Hello,</p>
    <p>We received a request to reset the password for your account.</p>
    <p>Please click <a href="${resetPasswordUrl}">Password Reset Link</a> to set a new password.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best Regards,</p>
    <p>Team EcoConnect</p>`;

    await sendEmail(user.email, "Password Reset", emailBody);

    res.status(200).send({ message: "Password Reset Link Sent to Your Email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET route to verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    // Find the user with the provided ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // Find the token and check its validity
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// POST route to reset the password
router.post("/:id/:token", async (req, res) => {
  try {
    // validating the new password using a complexity schema
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // finding the user with the provided ID
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    // finding the token and check its validity
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // if the user is not verified, mark them as verified
    if (!user.verified) user.verified = true;

    // generating a hash for the new password and update the user's password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;